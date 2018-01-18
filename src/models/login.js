// import { routerRedux } from 'dva/router';
import { authLogin } from '../services/api';
import { setAuthority } from '../utils/authority';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(authLogin, payload);
      // Login successfully
      if (response.code === 1) {
        // 非常粗暴的跳转,登陆成功之后权限会变成user或admin,会自动重定向到主页
        // Login success after permission changes to admin or user
        // The refresh will automatically redirect to the home page
        // yield put(routerRedux.push('/dashboard'));
        yield put({
          type: 'changeLoginStatus',
          payload: {
            response,
            currentAuthority: 'admin',
          },
        });
        window.location.reload();
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            response,
            currentAuthority: 'guest',
          },
        });
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        // yield put(routerRedux.push('/user/login'));
        // Login out after permission changes to admin or user
        // The refresh will automatically redirect to the login page
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        window.location.reload();
      }
    },
  },

  reducers: {
    // 对返回后的请求结果进行计算生成新的返回值
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        code: payload.response.code,
      };
    },
  },
};

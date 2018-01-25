import { message } from 'antd';
import { getArticleList, deleteArticle, changeArticleStatus } from '../services/api';

export default {
  namespace: 'article',

  state: {
    // 模板必须与返回的数据结构保持一致
    data: {
      result: {
        list: [],
        pagination: {},
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'getArticleList',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload);
      const list = yield call(getArticleList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getArticleList',
          payload: list,
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
    *changePublish({ payload }, { call, put }) {
      const params = {
        page_size: 10,
      };
      const response = yield call(changeArticleStatus, payload);
      const list = yield call(getArticleList, params);
      if (response.code === 1) {
        yield put({
          type: 'getTagList',
          payload: list,
        });
        message.success('更新成功');
      } else {
        message.error('更新失败');
      }
    },
    *changeState({ payload }, { call, put }) {
      const params = {
        page_size: 10,
      };
      const response = yield call(changeArticleStatus, payload);
      const list = yield call(getArticleList, params);
      if (response.code === 1) {
        yield put({
          type: 'getTagList',
          payload: list,
        });
        message.success('更新成功');
      } else {
        message.error('更新失败');
      }
    },
  },

  reducers: {
    getArticleList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

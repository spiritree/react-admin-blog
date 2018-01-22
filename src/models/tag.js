import { message } from 'antd';
import { getTagList, addTag, deleteTag, updateTag } from '../services/api';

export default {
  namespace: 'tag',

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
      const response = yield call(getTagList, payload);
      yield put({
        type: 'getTagList',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addTag, payload);
      const list = yield call(getTagList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getTagList',
          payload: list,
        });
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTag, payload);
      const list = yield call(getTagList, payload);
      if (response.code === 1) {
        yield put({
          type: 'getTagList',
          payload: list,
        });
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    },
    *update({ payload }, { call, put }) {
      const params = {
        page_size: 10,
      };
      const response = yield call(updateTag, payload);
      const list = yield call(getTagList, params);
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
    getTagList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

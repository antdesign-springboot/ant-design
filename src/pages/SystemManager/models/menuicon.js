import { queryIcon } from '@/services/api'; //, removeRule, addRule, updateRule
//DictionaryManager
export default {
  namespace: 'menuicon',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ callback }, { call, put }) {
      const response = yield call(queryIcon);
      console.log(response, '***************icon数据');
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
import { queryProvince, queryCity } from '@/services/geographic';
import { avatarFileUpload, updateBasic } from '@/services/api';

export default {
  namespace: 'geographic',

  state: {
    province: [],
    city: [],
    isLoading: false,
  },

  effects: {
    *fetchProvince(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProvince);
      yield put({
        type: 'setProvince',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCity({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCity, payload);
      yield put({
        type: 'setCity',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *avatarUpload({ payload, callback }, { call }) {
      const response = yield call(avatarFileUpload, payload);
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateBasic, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    setProvince(state, action) {
      return {
        ...state,
        province: action.payload,
      };
    },
    setCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
};

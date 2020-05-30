import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as HomeBannerListCreators,
  Types as HomeBannerListTypes,
} from 'appStore/ducks/home/banner/list';

import api from 'services/api';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getHomeBannerList() {
  try {
    const response = yield call(api.get, '/v1/site/home/banners');
    yield interceptResponse(response);
    yield put(HomeBannerListCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(HomeBannerListCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(HomeBannerListTypes.GET_REQUEST, getHomeBannerList)]);
}

import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import login from './login';
import homeBannerList from './home/banner/list';

function* rootSaga() {
  yield all([auth(), fork(login), fork(homeBannerList)]);
}

export default rootSaga;

import { combineReducers } from 'redux';

import auth from './auth';
import login from './login';
import homeBannerList from './home/banner/list';

import { reducer as notifications } from 'react-notification-system-redux';

export default combineReducers({
  auth,
  login,
  notifications,
  home: combineReducers({
    banner: combineReducers({
      list: homeBannerList,
    }),
  }),
  // course: combineReducers({
  //   list: courseList,
  //   details: courseDetails,
  //   comment: combineReducers({
  //     list: courseCommentList,
  //     actions: courseCommentActions,
  //   }),
  // }),
});

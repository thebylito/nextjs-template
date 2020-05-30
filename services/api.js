import { create } from 'apisauce';
import appUtils from 'utils/appUtils';

const apiUrl = {
  hml: '',
  prod: '',
};

const api = create({
  baseURL: appUtils.isDev ? apiUrl.hml : apiUrl.prod,
  headers: {
    Authorization: '',
  },
});

export default api;

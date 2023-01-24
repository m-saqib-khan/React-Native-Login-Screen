import axios from 'axios';
import {BASE_URL} from './Constant.js';

export const getRequest = async url => {
  try {
    const res = await axios.get(BASE_URL + url);

    return res?.data;
  } catch (error) {
    return error;
  }
};

export const postRequest = async (url, data) => {
  return new Promise(resolve => {
    axios.post(BASE_URL + url, data).then(res => {
      console.log(res, 'res');
      resolve(res);
    });
  });
};

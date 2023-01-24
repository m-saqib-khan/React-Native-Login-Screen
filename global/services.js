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
  console.log("url",BASE_URL+url)
  return new Promise((resolve,reject) => {
    axios.post(BASE_URL+url, data).then(res => {
      console.log(res, 'res');
      resolve(res);
    }).catch(e=>reject(e))
    ;
  });
};

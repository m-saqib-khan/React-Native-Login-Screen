import axios from 'axios';
import {BASE_URL} from './Constant.js';

export const getRequest = async url => {
  console.log("url",BASE_URL+url)
  return new Promise((resolve,reject) => {
    axios.get(BASE_URL+url).then(res => {
      resolve(res.data);
    }).catch(e=>reject(e))
    ;
  });
};

export const postRequest = async (url, data) => {
  console.log("url",BASE_URL+url)
  return new Promise((resolve,reject) => {
    axios.post(BASE_URL+url, data).then(res => {
      console.log(res, 'res');
      resolve(res.data);
    }).catch(e=>reject(e))
    ;
  });
};



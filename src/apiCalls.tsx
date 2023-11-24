import axios from 'axios';



const baseURL = 'https://codereview-survey.onrender.com/api';

// axios.defaults.withCredentials = true;

export const addreview = async (data) => {
    // console.log(data);
    const ret = await axios.post(`${baseURL}/review`, data);
  };
  function addLineBreaks(str) {
    let ret = '';
    const len = 50;
    for (let i = 0; i < str.length; i += len) {
      ret += str.substr(i, len) + '\n';
      
    }
    return ret;
  }
  function change(str) {
    return JSON.parse(`{
      "temp": "${str}"
    }`).temp
  }
  export const viewData = async (lang) => {
    // console.log(lang);
    const ret = await axios.get(`${baseURL}/review/${lang}`);
    let res = ret.data;
    // console.log(change(res.patch));
    res.original = addLineBreaks(change(res.original));
    res.output = addLineBreaks(change(res.output));
    res.patch = change(res.patch);
    // console.log(res.patch);

    // console.log(res);
    return res;
  };
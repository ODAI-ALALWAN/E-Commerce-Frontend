import axios from 'axios'




export const baseUrl = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  withCredentials: true, // مهم لإرسال الكوكيز
});

export const axiosPrivate = axios.create({
   baseURL : "http://127.0.0.1:5000/",
   headers : {'Content-Type' : 'application/json'},
   withCredentials : true
})
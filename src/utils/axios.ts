import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://vtc-be-laptop.onrender.com",
    });
  }
}

const http = new Http().instance;
export default http;

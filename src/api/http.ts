import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string, timeout = 1000 * 60) {
    this.instance = axios.create({ baseURL, timeout })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

const baseUrl: string = import.meta.env.DEV && (import.meta.env.VITE_OPEN_PROXY === 'true' ? '/api/v1/' : import.meta.env.VITE_APP_API_BASEURL)
export const http = new Http(baseUrl)

// set header
http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  if (config._autoLoading === true) {
    console.log('加载中')
  }
  return config
})

// cancel loading
http.instance.interceptors.response.use((response) => {
  if (response.config._autoLoading === true) {
    console.log('加载完成')
  }
  return response
}, (error: AxiosError) => {
  if (error.response?.config._autoLoading === true) {
    console.log('加载完成')
  }
  throw error
})

// error 
http.instance.interceptors.response.use(
  response => { return response },
  error => {
    let { message } = error
    if (message === 'Network Error') {
      message = '后端网络故障'
    }
    else if (message.includes('timeout')) {
      message = '接口请求超时'
    }
    else if (message.includes('Request failed with status code')) {
      message = `接口${message.substr(message.length - 3)}异常`
    }
    ElMessage({ message, type: 'error' })
    throw error
  }
)
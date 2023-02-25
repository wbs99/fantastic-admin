import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
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

const baseUrl: string = import.meta.env.DEV && (import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL)
export const http = new Http(baseUrl)

// set header
http.instance.interceptors.request.use(config => {
  // const jwt = localStorage.getItem('jwt')
  // if (jwt) {
  //   config.headers!.Authorization = `Bearer ${jwt}`
  // }
  // if (config._autoLoading === true) {
  //   console.log('加载中')
  // }
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
    if (error.response) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 429) {
        alert('你太频繁了')
      }
    }
    throw error
  }
)
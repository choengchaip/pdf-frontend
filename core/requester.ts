import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { CancelTokenSource, CancelTokenStatic } from '~/node_modules/axios'

export interface IResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request?: any
}

const ERROR_CODE = {
  ALERT: 'ALERT',
  ERROR: 'ERROR',
  FAIL: 'FAIL',
  TIMEOUT: 'TIMEOUT',
  INVALID_PARAMS: 'INVALID_PARAMS',
  UNAUTHORIZED: 'UNAUTHORIZED',
}

export interface IRequester {
  get<T>(path: string, options?: AxiosRequestConfig): Promise<IResponse<T>>

  put<T>(
    path: string,
    payload: any,
    options?: AxiosRequestConfig
  ): Promise<IResponse<T>>

  delete<T>(path: string, options?: AxiosRequestConfig): Promise<IResponse<T>>

  post<T>(
    path: string,
    payload: any,
    options?: AxiosRequestConfig
  ): Promise<IResponse<T>>
}

const timeout = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))

const refMiddleware = async (
  ref: any,
  path: string,
  options: AxiosRequestConfig = {}
) => {
  let res: any = ref
  let count = 0
  if (ref.data.ref && ref.data.code === 'REF') {
    async function getRef() {
      count++
      res = await NewRequester.get(path, {
        ...options,
        headers: {
          ...options.headers,
          ref: ref.data.ref,
        },
      })

      if (res.data.code === 'PROCESSING') {
        if (count >= 20) {
          throw {
            response: {
              data: {
                code: ERROR_CODE.TIMEOUT,
                message: ERROR_CODE.TIMEOUT,
              },
            },
          }
        }
        await timeout(500)
        await getRef()
      }
    }

    await getRef()
  }

  return res
}

const checkErrorMiddleWare = (
  data: IResponse<any>,
  path: string,
  options: AxiosRequestConfig = {}
) => {
  if (data.data?.code) {
    const errorData = {
      response: data,
    }
    switch (data.data?.code) {
      case ERROR_CODE.ALERT:
        throw errorData
        break
      case ERROR_CODE.ERROR:
        throw errorData
        break
      case ERROR_CODE.FAIL:
        throw errorData
        break
      case ERROR_CODE.INVALID_PARAMS:
        throw errorData
        break
      case ERROR_CODE.UNAUTHORIZED:
        throw errorData
        break
    }
  }

  return data
}

export class Requester {
  private service: AxiosInstance
  public cancelToken: CancelTokenStatic
  public source: CancelTokenSource
  public isCancel: (value: any) => boolean

  constructor(options: AxiosRequestConfig = {}) {
    this.service = axios.create(options)
    this.cancelToken = axios.CancelToken
    this.source = this.cancelToken.source()
    this.isCancel = axios.isCancel
  }

  public get<T>(
    path: string,
    options: AxiosRequestConfig = {}
  ): Promise<IResponse<T>> {
    return this.service
      .get<T>(path, options)
      .then((res) => checkErrorMiddleWare(res, path, options))
  }

  public put<T>(
    path: string,
    payload: any,
    options: AxiosRequestConfig = {}
  ): Promise<IResponse<T>> {
    return this.service
      .put<T>(path, payload, options)
      .then((ref) => refMiddleware(ref, path, options))
      .then((res) => checkErrorMiddleWare(res, path, options))
  }

  public delete<T>(
    path: string,
    options: AxiosRequestConfig = {}
  ): Promise<IResponse<T>> {
    return this.service
      .delete(path, options)
      .then((ref) => refMiddleware(ref, path, options))
      .then((res) => checkErrorMiddleWare(res, path, options))
  }

  public post<T>(
    path: string,
    payload: any,
    options: AxiosRequestConfig = {}
  ): Promise<IResponse<T>> {
    return this.service
      .post<T>(path, payload, options)
      .then((ref) => refMiddleware(ref, path, options))
      .then((res) => checkErrorMiddleWare(res, path, options))
  }
}

export const NewRequester = new Requester({
  headers: {},
})

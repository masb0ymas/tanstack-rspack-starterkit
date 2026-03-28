import type { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'
import _ from 'lodash'

import { AUTH_ERROR_TYPE } from '~/types/error'

import { AUTH_STORAGE_KEYS } from '../constants/auth'
import { HttpStatus } from '../constants/http-status'
import { ms } from '../date'

const timeout = ms('5m')

interface CreateAxiosProps {
  baseURL: string
  storageKey?: string
}

function createAxios({ baseURL, storageKey }: CreateAxiosProps) {
  const axiosInstance = axios.create({ baseURL, timeout })

  if (storageKey === AUTH_STORAGE_KEYS.AUTH_STORAGE) {
    axiosInstance.interceptors.request.use(async (config) => {
      const currentConfig = { ...config }
      // const session = await useAppSession()

      // if (session.data.accessToken) {
      //   try {
      //     currentConfig.headers.Authorization = `Bearer ${session.data.accessToken}`
      //   } catch (error) {
      //     console.error(error)
      //   }
      // }

      return currentConfig
    })
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.code === 'ERR_NETWORK') {
        throw new Error(HttpStatus.NETWORK_ERROR)
      }

      const errCode = _.get(error, 'response.data.code')
      if (error.response?.status === 401 && !errCode) {
        // if (storageKey === AUTH_STORAGE_KEYS.AUTH_STORAGE) {
        //   const session = await useAppSession()

        //   // check if refresh token exists
        //   if (session.data.refreshToken) {
        //     try {
        //       await refreshTokenFn({ data: { token: session.data.refreshToken } })
        //     } catch {
        //       throw new Error(HttpStatus.UNAUTHORIZED)
        //     }
        //   }
        // }

        throw new Error(HttpStatus.UNAUTHORIZED)
      }

      if (error.response?.status === 403) {
        throw new Error(HttpStatus.FORBIDDEN)
      }

      const errType = _.get(error, 'response.data.error.message')
      if (
        errType === AUTH_ERROR_TYPE.INVALID_LOGIN_CREDENTIALS ||
        errType === AUTH_ERROR_TYPE.INVALID_CREDENTIALS
      ) {
        throw new Error('Invalid credentials')
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export class ClientFetchApi {
  private _axiosInstance: AxiosInstance | null
  private readonly _baseURL: string
  private readonly _storageKey?: string

  constructor({ baseURL, storageKey }: CreateAxiosProps) {
    this._axiosInstance = null
    this._baseURL = baseURL
    this._storageKey = storageKey
  }

  public get default(): AxiosInstance {
    if (!this._axiosInstance) {
      this._axiosInstance = createAxios({
        baseURL: this._baseURL,
        storageKey: this._storageKey,
      })

      return this._axiosInstance
    }

    return this._axiosInstance
  }
}

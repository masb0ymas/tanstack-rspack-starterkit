import type { AxiosInstance } from 'axios'

import { env } from '~/env'
import type { ResourceMethods } from '~/types/api'
import { HTTP_METHOD } from '~/types/api'

import { AUTH_STORAGE_KEYS } from '../constants/auth'
import { ClientFetchApi } from './client-fetch'

/**
 * Generate URL with joining path
 * @param paths
 * @returns
 */
export function generateURL(paths: string[]): string {
  return paths.join('/')
}

/**
 * For Server Use
 * @param path
 * @param methods
 * @returns
 */
export function clientResource<
  TPath extends string,
  TMethods extends readonly HTTP_METHOD[],
  TData,
>(path: TPath, methods: TMethods): ResourceMethods<TData> {
  const clientFetch = new ClientFetchApi({
    baseURL: String(env.PUBLIC_SERVER_URL),
    storageKey: AUTH_STORAGE_KEYS.AUTH_STORAGE,
  }).default

  return resource(clientFetch, path, methods)
}

/**
 * Resource - Creates a REST API resource with CRUD operations.
 * Only support single resource api endpoint.
 *
 * @example
 * const user = resource('users', [HTTP_METHOD.GET, HTTP_METHOD.POST])
 * user.index()                           // GET /users
 * user.show(1)                           // GET /users/1
 * user.store({ name: 'John Doe' })       // POST /users
 * user.update(1, { name: 'John Doe' })   // PUT /users/1
 * user.edit(1, { name: 'John Doe' })     // PATCH /users/1
 * user.delete(1)                         // DELETE /users/1
 * @param path
 * @param methods
 * @returns
 */
export function resource<TPath extends string, TMethods extends readonly HTTP_METHOD[], TData>(
  fetchInstance: AxiosInstance,
  path: TPath,
  methods: TMethods
): ResourceMethods<TData> {
  const fetchApi = fetchInstance
  const api: Partial<ResourceMethods<TData>> = {}

  // For List and Get By ID
  if (methods.includes(HTTP_METHOD.GET)) {
    api.index = (params?: Record<string, unknown>) => {
      return fetchApi.get(generateURL([path]), { params })
    }

    api.show = (id: string | number) => {
      return fetchApi.get(generateURL([path, String(id)]))
    }
  }

  // For Create
  if (methods.includes(HTTP_METHOD.POST)) {
    api.store = (data?: Record<string, unknown>) => {
      return fetchApi.post(generateURL([path]), data)
    }
  }

  // For Update
  if (methods.includes(HTTP_METHOD.PUT)) {
    api.update = (id: string | number, data?: Record<string, unknown>) => {
      return fetchApi.put(generateURL([path, String(id)]), data)
    }
  }

  // For Update Partial
  if (methods.includes(HTTP_METHOD.PATCH)) {
    api.edit = (id: string | number, data?: Record<string, unknown>) => {
      return fetchApi.patch(generateURL([path, String(id)]), data)
    }
  }

  // For Delete
  if (methods.includes(HTTP_METHOD.DELETE)) {
    api.delete = (id: string | number) => {
      return fetchApi.delete(generateURL([path, String(id)]))
    }
  }

  return api as ResourceMethods<TData>
}

/**
 * Resources - Creates a REST API resources with CRUD operations.
 * Support multiple resources api endpoints.
 *
 * @example
 * const users = resources(['users', 'students'], [HTTP_METHOD.GET, HTTP_METHOD.POST])
 * users[0].index()                           // GET /users
 * users[0].show(1)                           // GET /users/1
 * users[0].store({ name: 'John Doe' })       // POST /users
 * users[0].update(1, { name: 'John Doe' })   // PUT /users/1
 * users[0].edit(1, { name: 'John Doe' })     // PATCH /users/1
 * users[0].delete(1)                         // DELETE /users/1
 * @param paths
 * @param methods
 * @returns
 */
export function resources<TPaths extends string[], TMethods extends readonly HTTP_METHOD[], TData>(
  paths: TPaths,
  methods: TMethods
): Partial<ResourceMethods<TData>>[] {
  const clientFetch = new ClientFetchApi({
    baseURL: String(env.PUBLIC_SERVER_URL),
    storageKey: AUTH_STORAGE_KEYS.AUTH_STORAGE,
  }).default

  return paths.map((path) => resource(clientFetch, path, methods))
}

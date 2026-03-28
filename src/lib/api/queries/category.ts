import { queryOptions } from '@tanstack/react-query'

import type { PaginateDto } from '../dtos/paginate'
import { services } from '../services'

const defaultParams: PaginateDto = { offset: 0, limit: 10 }

const listCategories = (params?: PaginateDto) =>
  queryOptions({
    queryKey: ['categories', params],
    queryFn: () => services.categories.index(params ?? defaultParams),
  })

const getCategory = (id: number) =>
  queryOptions({
    queryKey: ['category', id],
    queryFn: () => services.categories.show(id),
  })

export const categoryQueries = {
  list: listCategories,
  get: getCategory,
} as const

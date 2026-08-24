import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProduct, listProducts, removeProduct, updateProduct } from './product'
import type { ProductInput, ProductListParams } from '../model/types'

export const productKeys = {
  list: (params: ProductListParams = {}) => ['products', params] as const,
}

export function useProducts(params: ProductListParams = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => listProducts(params),
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: ProductInput) => createProduct(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: ProductInput }) => updateProduct(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useRemoveProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => removeProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}

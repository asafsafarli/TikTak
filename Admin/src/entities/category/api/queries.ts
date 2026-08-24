import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, listCategories, removeCategory, updateCategory } from './category'
import type { CategoryInput } from '../model/types'

export const categoryKeys = {
  list: ['categories'] as const,
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list,
    queryFn: async () => (await listCategories()).data,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CategoryInput) => createCategory(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoryKeys.list }),
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: CategoryInput }) =>
      updateCategory(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoryKeys.list }),
  })
}

export function useRemoveCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => removeCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoryKeys.list }),
  })
}

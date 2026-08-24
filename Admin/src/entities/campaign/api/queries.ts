import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCampaign, listCampaigns, removeCampaign, updateCampaign } from './campaign'
import type { CampaignInput } from '../model/types'

export const campaignKeys = {
  list: ['campaigns'] as const,
}

export function useCampaigns() {
  return useQuery({
    queryKey: campaignKeys.list,
    queryFn: async () => (await listCampaigns()).data,
  })
}

export function useCreateCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CampaignInput) => createCampaign(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: campaignKeys.list }),
  })
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: CampaignInput }) =>
      updateCampaign(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: campaignKeys.list }),
  })
}

export function useRemoveCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => removeCampaign(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: campaignKeys.list }),
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/axios'
import { queryKeys } from './keys'

export interface Card {
    id: string
    title: string
    platform: string
    status: string
    script_content: string
    thumbnail_url: string
    created_at: string
    owner_id: string
}

interface UpdateCardPayload {
    title: string
    platform: string
    status: string
}

interface PatchCardPayload {
    script: string
}


export function useGetCard() {
    return useQuery({
        queryKey: queryKeys.cards.mine,
        queryFn: () => api.get<Card>(`board/get`).then((res) => res.data)
    })
}

export function useUpdateCard(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateCardPayload) =>
            api.put<Card>(`board/cards/${id}`, data).then(r => r.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cards.mine })
            queryClient.invalidateQueries({ queryKey: queryKeys.cards.detail(id) })
        },
    })
}

export function usePatchCard(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: PatchCardPayload) =>
            api.patch<Card>(`board/cards/${id}`, data).then(r => r.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cards.mine })
            queryClient.invalidateQueries({ queryKey: queryKeys.cards.detail(id) })
        },
    })
}

export function useDeleteCard() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) =>
            api.delete(`/cards/${id}`).then(r => r.data),
        onSuccess: (_, id) => {
            // remove it from the list
            queryClient.invalidateQueries({ queryKey: queryKeys.cards.mine })
            // clean it out of the cache entirely — no point keeping a deleted card
            queryClient.removeQueries({ queryKey: queryKeys.cards.detail(id) })
        },
    })
}
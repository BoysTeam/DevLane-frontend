import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/axios'
import { queryKeys } from './keys'

interface CreateBoardPayload {
    title: string
    platform: string
}

interface Board {
    id: string
    title: string
    platform: string
    status: string
    script_content: string
    thumbnail_url: string
    created_at: string
    owner_id: string
}

export function useCreateBoard() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateBoardPayload) =>
            api.post<Board>('board/cards', data).then((res) => res.data),
        onSuccess: (data) => {

            queryClient.setQueryData(queryKeys.board.mine, data)
        }
    })
}
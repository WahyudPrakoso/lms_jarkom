import { useMutation, useQueryClient } from '@tanstack/react-query'

import { delMateri } from '../services/api'

export function useDeleteMateri() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delMateri,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['materi'] })
      console.log('materi deleted successfully 🎉')
    },
  })
}

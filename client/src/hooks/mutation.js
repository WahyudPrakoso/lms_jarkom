import { useMutation, useQueryClient } from '@tanstack/react-query'

import { delMateri, delSoal, delVideo } from '../services/api'

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

export function useDeleteVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delVideo,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['video'] })
      console.log('materi video deleted successfully 🎉')
    },
  })
}

export function useDeleteSoal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delSoal,

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['soal'] })
      console.log('soal deleted successfully 🎉')
    },
  })
}

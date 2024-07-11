import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAllMateri, getMateri, getMateriPages, getPDF } from '../services/api'
export function fetchMateri() {
  return useQuery({
    queryKey: ['materi'],
    queryFn: getAllMateri,
  });
}

export function useMateriPages(page) {
  return useQuery({
    queryKey: ['materi', {page}],
    queryFn: () => getMateriPages(page),
    placeholderData: keepPreviousData,
  });
}

export function useMateriById(id){
  return useQuery({
    queryKey: ['materi', id],
    queryFn: () => getMateri(id),
  })
}
export function usePdf(file){
  return useQuery({
    queryKey: ['pdf', file],
    queryFn: () => getPDF(file),
  })
}
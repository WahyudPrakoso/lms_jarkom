import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAllMateri, getMateriPages } from '../services/api'
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
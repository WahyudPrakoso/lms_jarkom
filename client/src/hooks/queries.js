import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAllMateri, getMateri, getMateriPages, getPDF } from '../services/api'
export function fetchMateri() {
  return useQuery({
    queryKey: ['materi'],
    queryFn: getAllMateri,
  });
}

export function useMateriPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['materi', {limit,page,filter}],
    queryFn: () => getMateriPages(limit,page,filter),
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
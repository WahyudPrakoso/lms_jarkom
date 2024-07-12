import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAllMateri, getMateri, getMateriPages, getPDF, getSoal, getSoalPages, getVideo, getVideoPages } from '../services/api'
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

export function useVideoPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['video', {limit,page,filter}],
    queryFn: () => getVideoPages(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useVideoById(id){
  return useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideo(id),
  })
}
export function useSoalPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['soal', {limit,page,filter}],
    queryFn: () => getSoalPages(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useSoalById(id){
  return useQuery({
    queryKey: ['soal', id],
    queryFn: () => getSoal(id),
  })
}
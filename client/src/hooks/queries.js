import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { 
  getAllMateri, 
  getAnswer, 
  getAnswerPages, 
  getAnswerPagesMe, 
  getAnswerPagesSoal, 
  getDashboard, 
  getMateri, 
  getMateriPages, 
  getPDF, getSoal, 
  getSoalPages, 
  getUser, 
  getUserPages, 
  getVideo, 
  getVideoPages } from '../services/api'

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
    queryKey: ['materibyid', id],
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
    queryKey: ['videobyid', id],
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
    queryKey: ['soalbyid', id],
    queryFn: () => getSoal(id),
  })
}

export function useAnswerPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['answer', {limit,page,filter}],
    queryFn: () => getAnswerPages(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useAnswerPagesMe(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['answerMe', {limit,page,filter}],
    queryFn: () => getAnswerPagesMe(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useAnswerPagesSoal(id,limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['answerSoal', {id,limit,page,filter}],
    queryFn: () => getAnswerPagesSoal(id,limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useAnswerById(id){
  return useQuery({
    queryKey: ['answerbyid', id],
    queryFn: () => getAnswer(id),
  })
}

export function useDashboard(){
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard(),
  })
}

export function useUserPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['user', {limit,page,filter}],
    queryFn: () => getUserPages(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useUserById(id){
  return useQuery({
    queryKey: ['userbyid', id],
    queryFn: () => getUser(id),
  })
}
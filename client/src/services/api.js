import axios from "axios";
import { makeRequest, makeRequestUpload } from "../axios";

const server = import.meta.env.VITE_SERVER_ADDRESS;
//// TANPA AXIOS
// const server = import.meta.env.VITE_SERVER_ADDRESS;
// export async function getMateri() {
//     const response = await fetch(`$${server}}/materi`)
//     return response.json()
// }
// export async function createMateri(newData) {
//   const response = await fetch(`${server}/materi`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newData),
//   })
//   return response.json()
// }
export async function getAllMateri() {
    return (await makeRequest.get(`/materi/`)).data
}
export const getMateriPages = async (limit=5,pageParam = 1,filter='') => {
    // console.log("api ==========> page " +pageParam+" limit : "+limit+" filter : "+filter);
    const response = await makeRequest.get(`/materi?page=${pageParam}&limit=${limit}&filter=${filter}`)
    return response.data
}

export async function getMateri(id) {
    return (await makeRequest.get(`/materi/${id}`)).data
}

export async function getPDF(pdf) {
    return (await makeRequest.post(`/pdf/`, pdf, {responseType: 'blob'})).data
}

// sending form with file in one of data

// export async function createMateri(newData) {
//     const formData = new FormData();
//     formData.append("file", newData.file);
//     formData.append("name", newData.name);
//     formData.append("about", newData.about);
//     return (await makeRequest.post('/materi', formData)).data
// }

//without file
export async function createMateri(newData) {
    return (await makeRequest.post('/materi', newData)).data
}

export async function editMateri(newData) {
    return (await makeRequest.patch(`/materi/${newData.id}`,newData)).data
}

export async function delMateri(id) {
    return (await makeRequest.delete(`/materi/${id}`)).data
}
  
export const getVideoPages = async (limit=5,pageParam = 1,filter='') => {
    // console.log("api ==========> page " +pageParam+" limit : "+limit+" filter : "+filter);
    const response = await makeRequest.get(`/vidmateri?page=${pageParam}&limit=${limit}&filter=${filter}`)
    return response.data
}

export async function getVideo(id) {
    return (await makeRequest.get(`/vidmateri/${id}`)).data
}

export async function createVideo(newData) {
    return (await makeRequest.post('/vidmateri', newData)).data
}

export async function editVideo(newData) {
    return (await makeRequest.patch(`/vidmateri/${newData.id}`,newData)).data
}

export async function delVideo(id) {
    return (await makeRequest.delete(`/vidmateri/${id}`)).data
}

export const getSoalPages = async (limit=5,pageParam = 1,filter='') => {
    const response = await makeRequest.get(`/soal?page=${pageParam}&limit=${limit}&filter=${filter}`)
    return response.data
}

export async function getSoal(id) {
    return (await makeRequest.get(`/soal/${id}`)).data
}

export async function createSoal(newData) {
    return (await makeRequest.post('/soal', newData)).data
}

export async function editSoal(newData) {
    return (await makeRequest.patch(`/soal/${newData.id}`,newData)).data
}

export async function delSoal(id) {
    return (await makeRequest.delete(`/soal/${id}`)).data
}

export const getAnswerPages = async (limit=5,pageParam = 1,filter='') => {
    const response = await makeRequest.get(`/answer?page=${pageParam}&limit=${limit}&filter=${filter}`)
    return response.data
}

export const getAnswerPagesMe = async (limit=5,pageParam = 1,filter='') => {
    const response = await makeRequest.get(`/answer/me?page=${pageParam}&limit=${limit}&filter=${filter}`)
    return response.data
}

export const getAnswerPagesSoal = async (id,limit=5,pageParam = 1,filter='') => {
    const response = await makeRequest.get(`/answer/soal/${id}?page=${pageParam}&limit=${limit}&filter=${filter}`)
    return response.data
}

export async function getAnswer(id) {
    return (await makeRequest.get(`/answer/detail/${id}`)).data
}

export async function createAnswer(newData) {
    return (await makeRequest.post(`/answer/${newData.id}`, newData)).data
}

export async function editAnswer(newData) {
    return (await makeRequest.patch(`/answer/${newData.id}`,newData)).data

}export async function editNilai(newData) {
    return (await makeRequest.patch(`/answer/nilai/${newData.id}`,newData)).data
}

export async function delAnswer(id) {
    return (await makeRequest.delete(`/answer/${id}`)).data
}

export async function getDashboard() {
    return (await makeRequest.get(`/dashboard`)).data
}

export const getUserPages = async (limit=5,pageParam = 1,filter='') => {
    const response = await makeRequest.get(`/user?page=${pageParam}&limit=${limit}&filter=${filter}`)
    return response.data
}
export async function getUser(id) {
    return (await makeRequest.get(`/user/${id}`)).data
}
export async function createUser(newData) {
    return (await makeRequest.post(`/user`, newData)).data
}

export async function editUser(newData) {
    return (await makeRequest.patch(`/user/${newData.id}`,newData)).data
}

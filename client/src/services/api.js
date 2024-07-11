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

export async function createMateri(newData) {
    console.log(newData);
    const formData = new FormData();
    formData.append("file", newData.file);
    formData.append("name", newData.name);
    formData.append("about", newData.about);
    return (await makeRequest.post('/materi', formData)).data
}

export async function editMateri(newData) {
    const formData = new FormData();
    formData.append("file", newData.updatedFile);
    formData.append("name", newData.name);
    formData.append("about", newData.about);
    return (await makeRequestUpload.patch(`/materi/${newData.id}`,formData)).data
}

export async function delMateri(id) {
    return (await makeRequest.delete(`/materi/${id}`)).data
}
  
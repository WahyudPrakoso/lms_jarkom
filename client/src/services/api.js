import { makeRequest } from "../axios";

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
export const getMateriPages = async (pageParam = 1) => {
    // console.log("page " +pageParam);
    const response = await makeRequest.get(`/materi?page=${pageParam}`)
    return response.data
}

export async function getMateri(id) {
    return (await makeRequest.get(`/materi/${id}`)).data
}

export async function createMateri(newData) {
    return (await makeRequest.post('/materi', newData)).data
}

export async function editMateri(id, newData) {
    return (await makeRequest.patch(`/materi/${id}`, newData)).data
}

export async function delMateri(id) {
    return (await makeRequest.delete(`/materi/${id}`)).data
}
  
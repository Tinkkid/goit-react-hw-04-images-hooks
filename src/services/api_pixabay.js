import axios from 'axios';
const API_KEY = '30924994-a957df5e0c4e2063d1e50072c';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPixabay(query, page) {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}

// export async function fetchPixabay(query, page) {

//   return fetch(
//     `BASE_URL?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(responce => {
//     if (responce.ok) {
//       return responce.json();
//     }
//     return Promise.reject(new Error(`No images`));
//   });
// }

// const ApiPixbay = {
//   fetchPixbay,
// };

// export default ApiPixbay;

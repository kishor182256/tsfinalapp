import axios from 'axios';
import { log } from 'console';
import jwtDecode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export const createOrGetUser = async (response: any) => {
//   var base64Url = response.credential.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));
  
//   const { name, picture, sub } = JSON.parse(jsonPayload)
  
//   const user = {
//     _id: sub,
//     _type: 'user',
//     userName: name,
//     image: picture,
//   };
  
//   // addUser(user);

//   await axios.post(`http://localhost:3000/api/auth`, user).then((response) => {
//     console.log(response);
//   }).catch((err) => {
//     console.log(err);
//   })
// };

export const createOrGetUser = async (response: any,addUser:any) => {
  const decoded:{name: string, email: string, sub: string,picture: string} = jwtDecode(response.credential)

  const {name, email,picture, sub} = decoded;
  const user = {
    _id: sub,
    _type: 'user',
    userName:name,
    image:picture
  }
  addUser(user);
    await axios.post('http://localhost:3000/api/auth', user);
}
import Loader from "../components/home/loading";
import { BACKEND_URL } from "../utils/Constant";

export const formDataHandle = async (route, bodyData) => {
  const response = await fetch(BACKEND_URL + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mobile : bodyData })
  });
  
  const data = await response.json();
  if (!data.status) {
   return <Loader />
  }
  return data;
}
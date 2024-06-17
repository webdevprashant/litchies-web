import { BACKEND_URL } from "../utils/Constant";

export const formDataHandle = async (route, bodyData) => {
  const response = await fetch(BACKEND_URL + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData)
  });
  
  const data = await response.json();
  return data;
}
import { BACKEND_URL } from "../utils/Constant";

export const fetchData = async (route) => {
  const response = await fetch(BACKEND_URL + route, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  return data;
}
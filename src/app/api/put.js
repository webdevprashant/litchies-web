import { BACKEND_URL } from "../utils/Constant";

export const Update = async (route, body) => {
  const response = await fetch(BACKEND_URL + route, {
    method: "PUT",
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return data;
}
  "use server";
import { cookies } from "next/headers";

export async function getCookie(name) {
  return cookies().get(name);
}

export async function hasCookie(name)  {
  const hascookie = cookies().has(name);
  return hascookie; 
}
export async function setCookie(name , data) {
    return cookies().set(name , data, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600 * 24,
      secure: false
    })
}

export async function deleteCookie(name) {
  return cookies().delete(name);
}
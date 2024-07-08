import { SigninFormType } from "@/tipes";

const loginHost = "https://skypro-music-api.skyeng.tech/user/login/";
const tokenUrl = "https://skypro-music-api.skyeng.tech/user/token/";

export const fetchUser = async ({ email, password }: SigninFormType) => {
  return fetch(loginHost, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Неверный логин или пароль");
    }
    const responseData = response.json();
    return responseData;
  });
};

export const fetchTokens = async ({ email, password }: SigninFormType) => {
  const response = await fetch(tokenUrl, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("Неверный токен");
  } else if (!response.ok) {
    throw new Error("Заполните поля");
  }
  const responseData = response.json();
  return responseData;
};

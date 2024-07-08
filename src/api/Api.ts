const baseHost = "https://skypro-music-api.skyeng.tech/catalog";
const getTracksHost = `${baseHost}/track/all`;
const favoriteTracksHost = `${baseHost}/track/favorite/all`;
const getCategoryTracksHost = `${baseHost}/selection`;
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcxMjcxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4YzQ5NDNmOWNmNTRlZjI5NmFmNTMyOWUwODM4YWQ5IiwidXNlcl9pZCI6NzkyfQ.5n8YHTjsgAnYnc4gioyV1wPnxM2D16PS6c9kNhC-JoE";

export async function getTracks() {
  const response = await fetch(getTracksHost, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Не удалось загрузить плейлист, попробуйте позже");
  }
  const data = await response.json();
  return data;
}

export async function fetchFavoriteTracks(access: string) {
  const response = await fetch(favoriteTracksHost, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  if (!response.ok) {
    throw new Error("Не удалось получить список треков, попробуйте позже");
  }
  const data = await response.json();
  return data;
}

export async function addLike(id: string, access: string) {
  const response = await fetch(`${baseHost}/track/${id}/favorite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({
      id,
    }),
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data;
}

export async function getCategoryTracks(id: string) {
  const response = await fetch(`${getCategoryTracksHost}/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data.items;
  // id, items - смотрим в док-ции//
}

export async function addDisLike(id: string, access: string) {
  const response = await fetch(`${baseHost}/track/${id}/favorite`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({
      id,
    }),
  });
  if (!response.ok) {
    throw new Error("Ошибка при удалении данных");
  }
  const data = await response.json();
  return data;
}


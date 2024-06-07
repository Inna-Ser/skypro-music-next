const baseHost = "https://skypro-music-api.skyeng.tech/catalog";
const getTracksHost = `${baseHost}/track/all`;
const signupHost = "https://skypro-music-api.skyeng.tech/user/signup/";
const loginHost = "https://skypro-music-api.skyeng.tech/user/login/";

export async function getTracks() {
    const response = await fetch(getTracksHost, {
            method: "GET"
    });
    if (!response.ok) {
            throw new Error("Не удалось загрузить плейлист, попробуйте позже")
    }
    const data = await response.json();
    return data;
}

import {
    createSlice
} from "@reduxjs/toolkit";

const volumeSlice = createSlice({
    name: "volume",
    initialState: {
        isMute: false,
        currentVolume: null
    },
    reducers: {
        setIsMute: (state) => {
            state.isMute = !state.isMute;
        },
        setCurrentVolume: (state, action) => {
            state.currentVolume = action.payload;
        }
    }
})

export const {
    setIsMute,
    setCurrentVolume,
} = volumeSlice.actions;
export default volumeSlice.reducer
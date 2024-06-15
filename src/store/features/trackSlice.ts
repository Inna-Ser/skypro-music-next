import { TrackItem } from "@/tipes";
import { playShuffleTrack } from "@/utils/helper";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TracksStateType = {
  currentTrack: TrackItem | null;
  isPlaying: boolean;
  isShuffle: boolean;
  initialTracks: TrackItem[];
  shuffleTracks: TrackItem[];
  likedTracks: TrackItem[];
  playList: TrackItem[];
  currentTrackIndex: number | null;
  isLiked: boolean;
  isDisliked: boolean;
};

const initialState: TracksStateType = {
  currentTrack: null,
  isPlaying: false,
  isShuffle: false,
  initialTracks: [],
  shuffleTracks: [],
  playList: [],
  likedTracks: [],
  currentTrackIndex: null,
  isLiked: false,
  isDisliked: false,
};
const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackItem | null>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
      if (state.isShuffle) {
        // Если включен режим перемешивания, перемешиваем список треков и сохраняем его в shuffleTracks
        state.shuffleTracks = playShuffleTrack([...state.initialTracks]);
      }
    },
    setPrev: (state) => {
        const tracks = state.isShuffle ? state.shuffleTracks : state.initialTracks;
        const currentTrackIndex = tracks.findIndex((track) => track.id === state.currentTrack?.id);
        if (currentTrackIndex === 0) {
            return;
        } else {
            const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
            state.currentTrack = tracks[newIndex];
        }
    },
    setNext: (state) => {
        const tracks = state.isShuffle ? state.shuffleTracks : state.initialTracks;
        const currentTrackIndex = tracks.findIndex((track) => track.id === state.currentTrack?.id);
        if (currentTrackIndex === tracks.length - 1) {
            return;
        } else {
            const newIndex = (currentTrackIndex + 1 + tracks.length) % tracks.length
            state.currentTrack = tracks[newIndex];
        }
    },
    setInitialTracks: (state, action: PayloadAction<TrackItem[]>) => {
      state.initialTracks = action.payload;
      state.playList = [...action.payload]; // Устанавливаем плейлист с треками
    },
  },
});

export const {
  setCurrentTrack,
  setPrev,
  setNext,
  setInitialTracks,
  setIsShuffle,
  setIsPlaying,
} = tracksSlice.actions;

export const tracksReducer = tracksSlice.reducer;

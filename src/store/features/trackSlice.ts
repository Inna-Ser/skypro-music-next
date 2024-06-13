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
    setIsShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
      if (state.isShuffle && state.initialTracks.length > 0) {
        const playList = [...state.initialTracks];
        state.shuffleTracks = playShuffleTrack(playList);
      } else {
        state.shuffleTracks = [];
      }
    },
    setPrev: (state) => {
      const tracks = state.isShuffle
        ? state.shuffleTracks
        : state.initialTracks;
      const currentTrackIndex = tracks.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      if (currentTrackIndex === 0) {
        return;
      } else {
        const newIndex =
          (currentTrackIndex - 1 + tracks.length) % tracks.length;
        state.currentTrack = tracks[newIndex];
      }
    },
    setNext: (state) => {
      const tracks = state.isShuffle
        ? state.shuffleTracks
        : state.initialTracks;
      if (state.currentTrack && tracks.length > 0) {
        const currentTrackIndex = tracks.findIndex(
          (track) => track.id === state.currentTrack!.id
        );
        if (
          currentTrackIndex !== tracks.length - 1 &&
          currentTrackIndex !== -1
        ) {
          const newIndex =
            (currentTrackIndex + 1 + tracks.length) % tracks.length;
          state.currentTrack = tracks[newIndex];
        }
      }
    },
    
    setInitialTracks: (state, action: PayloadAction<TrackItem[]>) => {
      state.initialTracks = action.payload;
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

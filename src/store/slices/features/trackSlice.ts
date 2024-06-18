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
  trackList: TrackItem[];
  filterOptions: {
    author: string[];
    genre: string[];
    order: string;
    searchString: string;
    tracks?: TrackItem[];
  };
  filterPlaylist: TrackItem[];
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
  trackList: [],
  filterOptions: {
    author: [],
    genre: [],
    order: "по умолчанию",
    searchString: "",
    tracks: [],
  },
  filterPlaylist: [],
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
      } else {
        state.shuffleTracks = [...state.initialTracks];
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
      const currentTrackIndex = tracks.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      if (currentTrackIndex === tracks.length - 1) {
        return;
      } else {
        const newIndex =
          (currentTrackIndex + 1 + tracks.length) % tracks.length;
        state.currentTrack = tracks[newIndex];
      }
    },
    setInitialTracks: (state, action: PayloadAction<TrackItem[]>) => {
      state.initialTracks = action.payload;
      state.playList = [...action.payload];
      state.trackList = [...action.payload];
    },
    setPlayList: (state, action: PayloadAction<{ tracks: TrackItem[] }>) => {
      state.playList = action.payload.tracks;
      state.filterPlaylist = action.payload.tracks;
    },
    setFilter: (
      state,
      action: PayloadAction<{
        author?: string[];
        genre?: string[];
        order?: string;
        searchString?: string;
        tracks: TrackItem[];
      }>
    ) => {
      state.filterOptions = {
        ...state.filterOptions, // расширяем текущие опции фильтра
        author: action.payload.author || state.filterOptions.author,
        genre: action.payload.genre || state.filterOptions.genre,
        order: action.payload.order || state.filterOptions.order,
        searchString:
          action.payload.searchString || state.filterOptions.searchString,
        tracks: action.payload.tracks, // устанавливаем новый список треков
      };

      // Фильтрация треков
      if (action.payload.tracks) {
        // проверяем наличие tracks в payload
        const filterTracks = action.payload.tracks.filter((track) => {
          const hasSearchString = track.name
            .toLowerCase()
            .includes(state.filterOptions.searchString.toLowerCase());
          const hasAuthor =
            state.filterOptions.author?.length > 0
              ? state.filterOptions.author.includes(track.author)
              : true;
          const hasGenre =
            state.filterOptions.genre?.length > 0
              ? state.filterOptions.genre.includes(track.genre)
              : true;
          return hasSearchString && hasAuthor && hasGenre;
        });

        // Сортировка треков в соответствии с выбранным порядком
        switch (state.filterOptions.order) {
          case "First new":
            filterTracks.sort(
              (a, b) =>
                new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime()
            );
            break;
          case "First old":
            filterTracks.sort(
              (a, b) =>
                new Date(a.release_date).getTime() -
                new Date(b.release_date).getTime()
            );
            break;
          default:
            break;
        }
        state.filterPlaylist = filterTracks;
      }
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
  setFilter,
  setPlayList,
} = tracksSlice.actions;

export const tracksReducer = tracksSlice.reducer;

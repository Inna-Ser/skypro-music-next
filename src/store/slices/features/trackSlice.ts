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
    order: "First New" | "First Old" | "по умолчанию";
    searchString: string;
    tracks?: TrackItem[];
  };
  filterPlaylist: TrackItem[];
  isFilteringAuthor: boolean;
  isFilteringGenre: boolean;
  isSortedTracks: boolean;
  filterPlaylistByAuthor: TrackItem[];
  filterPlaylistByGenre: TrackItem[];
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
  isFilteringAuthor: false,
  isFilteringGenre: false,
  isSortedTracks: false,
  filterPlaylistByAuthor: [],
  filterPlaylistByGenre: [],
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
        state.shuffleTracks = playShuffleTrack([...state.filterPlaylist]);
      } else {
        state.shuffleTracks = [...state.filterPlaylist];
      }
    },
    setIsFilteringAuthor: (state, action: PayloadAction<boolean>) => {
      state.isFilteringAuthor = action.payload;
    },
    setIsFilteringGenre: (state, action: PayloadAction<boolean>) => {
      state.isFilteringGenre = action.payload;
    },
    setIsSortByYears: (state, action: PayloadAction<boolean>) => {
      state.isSortedTracks = action.payload;
    },
    setPrev: (state) => {
      const tracks = state.isShuffle
        ? state.shuffleTracks
        : state.filterPlaylist;
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
        : state.filterPlaylist;
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
        order?: "First New" | "First Old" | "по умолчанию"; // Уточнение типов
        searchString?: string;
        tracks: TrackItem[];
      }>
    ) => {
      state.filterOptions = {
        ...state.filterOptions,
        author: action.payload.author || state.filterOptions.author,
        genre: action.payload.genre || state.filterOptions.genre,
        order: action.payload.order || state.filterOptions.order,
        searchString:
          action.payload.searchString !== undefined
            ? action.payload.searchString.toLowerCase()
            : state.filterOptions.searchString.toLowerCase(),
        tracks: action.payload.tracks,
      };

      // Фильтрация треков
      if (action.payload.tracks) {
        let filteredTracks = action.payload.tracks;

        if (state.initialTracks) {
          const searchedTracks = state.initialTracks.filter((track) => {
            return track.name
              .toLowerCase()
              .includes(state.filterOptions.searchString.toLowerCase());
          });
          state.filterOptions.tracks = searchedTracks;
        }

        // Фильтрация по автору
        if (state.isFilteringAuthor) {
          filteredTracks = filteredTracks.filter((track) => {
            const hasSearchString = track.name
              .toLowerCase()
              .includes(state.filterOptions.searchString.toLowerCase());
            const hasAuthor =
              state.filterOptions.author?.length > 0
                ? state.filterOptions.author.includes(track.author)
                : true;
            return hasSearchString && hasAuthor;
          });

          // Sort by years based on selected order
          if (state.isSortedTracks) {
            filteredTracks.sort((a, b) => {
              if (state.filterOptions.order === "First New") {
                return (
                  new Date(b.release_date).getTime() -
                  new Date(a.release_date).getTime()
                );
              } else if (state.filterOptions.order === "First Old") {
                return (
                  new Date(a.release_date).getTime() -
                  new Date(b.release_date).getTime()
                );
              }
              return 0;
            });
          }
          state.filterPlaylistByAuthor = filteredTracks;
        }

        // Filter by genre
        if (state.isFilteringGenre) {
          filteredTracks = filteredTracks.filter((track) => {
            const hasSearchString = track.name
              .toLowerCase()
              .includes(state.filterOptions.searchString.toLowerCase());
            const hasGenre =
              state.filterOptions.genre?.length > 0
                ? state.filterOptions.genre.includes(track.genre)
                : true;
            return hasSearchString && hasGenre;
          });

          // Sort by years based on selected order
          if (state.isSortedTracks) {
            filteredTracks.sort((a, b) => {
              if (state.filterOptions.order === "First New") {
                return (
                  new Date(b.release_date).getTime() -
                  new Date(a.release_date).getTime()
                );
              } else if (state.filterOptions.order === "First Old") {
                return (
                  new Date(a.release_date).getTime() -
                  new Date(b.release_date).getTime()
                );
              }
              return 0;
            });
          }
          state.filterPlaylistByGenre = filteredTracks;
        }

        state.filterPlaylist = filteredTracks;
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
  setIsFilteringAuthor,
  setIsFilteringGenre,
  setIsSortByYears,
} = tracksSlice.actions;

export const tracksReducer = tracksSlice.reducer;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
exports.__esModule = true;
exports.tracksReducer = exports.setIsFiltering = exports.setPlayList = exports.setFilter = exports.setIsPlaying = exports.setIsShuffle = exports.setInitialTracks = exports.setNext = exports.setPrev = exports.setCurrentTrack = void 0;
var helper_1 = require("@/utils/helper");
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
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
        tracks: []
    },
    filterPlaylist: [],
    isFiltering: false,
    filteredByAuthorCount: 0,
    filteredByGenreCount: 0
};
var tracksSlice = toolkit_1.createSlice({
    name: "tracks",
    initialState: initialState,
    reducers: {
        setCurrentTrack: function (state, action) {
            state.currentTrack = action.payload;
            state.isPlaying = true;
        },
        setIsPlaying: function (state, action) {
            state.isPlaying = action.payload;
        },
        setIsShuffle: function (state, action) {
            state.isShuffle = action.payload;
            if (state.isShuffle) {
                // Если включен режим перемешивания, перемешиваем список треков и сохраняем его в shuffleTracks
                state.shuffleTracks = helper_1.playShuffleTrack(__spreadArrays(state.initialTracks));
            }
            else {
                state.shuffleTracks = __spreadArrays(state.initialTracks);
            }
        },
        setIsFiltering: function (state, action) {
            state.isFiltering = action.payload;
        },
        setPrev: function (state) {
            var tracks = state.isShuffle
                ? state.shuffleTracks
                : state.initialTracks;
            var currentTrackIndex = tracks.findIndex(function (track) { var _a; return track.id === ((_a = state.currentTrack) === null || _a === void 0 ? void 0 : _a.id); });
            if (currentTrackIndex === 0) {
                return;
            }
            else {
                var newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
                state.currentTrack = tracks[newIndex];
            }
        },
        setNext: function (state) {
            var tracks = state.isShuffle
                ? state.shuffleTracks
                : state.initialTracks;
            var currentTrackIndex = tracks.findIndex(function (track) { var _a; return track.id === ((_a = state.currentTrack) === null || _a === void 0 ? void 0 : _a.id); });
            if (currentTrackIndex === tracks.length - 1) {
                return;
            }
            else {
                var newIndex = (currentTrackIndex + 1 + tracks.length) % tracks.length;
                state.currentTrack = tracks[newIndex];
            }
        },
        setInitialTracks: function (state, action) {
            state.initialTracks = action.payload;
            state.playList = __spreadArrays(action.payload);
            state.trackList = __spreadArrays(action.payload);
        },
        setPlayList: function (state, action) {
            state.playList = action.payload.tracks;
            state.filterPlaylist = action.payload.tracks;
        },
        setFilter: function (state, action) {
            state.filterOptions = __assign(__assign({}, state.filterOptions), { author: action.payload.author || state.filterOptions.author, genre: action.payload.genre || state.filterOptions.genre, order: action.payload.order || state.filterOptions.order, searchString: action.payload.searchString || state.filterOptions.searchString, tracks: action.payload.tracks });
            // Фильтрация треков
            if (action.payload.tracks) {
                // проверяем наличие tracks в payload
                var filterTracks = action.payload.tracks.filter(function (track) {
                    var _a, _b;
                    var hasSearchString = track.name
                        .toLowerCase()
                        .includes(state.filterOptions.searchString.toLowerCase());
                    var hasAuthor = ((_a = state.filterOptions.author) === null || _a === void 0 ? void 0 : _a.length) > 0
                        ? state.filterOptions.author.includes(track.author)
                        : true;
                    var hasGenre = ((_b = state.filterOptions.genre) === null || _b === void 0 ? void 0 : _b.length) > 0
                        ? state.filterOptions.genre.includes(track.genre)
                        : true;
                    return hasSearchString && hasAuthor && hasGenre;
                });
                // Сортировка треков в соответствии с выбранным порядком
                switch (state.filterOptions.order) {
                    case "First new":
                        filterTracks.sort(function (a, b) {
                            return new Date(b.release_date).getTime() -
                                new Date(a.release_date).getTime();
                        });
                        break;
                    case "First old":
                        filterTracks.sort(function (a, b) {
                            return new Date(a.release_date).getTime() -
                                new Date(b.release_date).getTime();
                        });
                        break;
                    default:
                        break;
                }
                state.filterPlaylist = filterTracks;
            }
        }
    }
});
exports.setCurrentTrack = (_a = tracksSlice.actions, _a.setCurrentTrack), exports.setPrev = _a.setPrev, exports.setNext = _a.setNext, exports.setInitialTracks = _a.setInitialTracks, exports.setIsShuffle = _a.setIsShuffle, exports.setIsPlaying = _a.setIsPlaying, exports.setFilter = _a.setFilter, exports.setPlayList = _a.setPlayList, exports.setIsFiltering = _a.setIsFiltering;
exports.tracksReducer = tracksSlice.reducer;

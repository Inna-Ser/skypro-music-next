"use client";
"use strict";
exports.__esModule = true;
exports.PlayList = void 0;
var classnames_1 = require("classnames");
var Track_1 = require("./track/Track");
var PlayList_module_css_1 = require("./PlayList.module.css");
var store_1 = require("@/store/store");
var trackSlice_1 = require("@/store/slices/features/trackSlice");
var react_1 = require("react");
exports.PlayList = function () {
    var _a = react_1.useState(null), addTodoError = _a[0], setAddTodoError = _a[1];
    var filteredTracks = store_1.useAppSelector(function (state) { return state.tracks.filterPlaylist; });
    var trackList = store_1.useAppSelector(function (state) { return state.tracks.trackList; });
    var dispatch = store_1.useAppDispatch();
    react_1.useEffect(function () {
        dispatch(trackSlice_1.setPlayList({ tracks: trackList }));
    }, [dispatch, trackList]);
    return (React.createElement("div", { className: classnames_1["default"](PlayList_module_css_1["default"].contentPlaylist, PlayList_module_css_1["default"].playlist) },
        React.createElement("p", { style: { color: "purple" } }, addTodoError),
        filteredTracks.map(function (track) { return (React.createElement(Track_1.Track, { key: track.id, id: track.id, name: track.name, author: track.author, album: track.album, time: track.duration_in_seconds, setCurrentTrack: function () { return dispatch(trackSlice_1.setCurrentTrack(track)); } })); })));
};

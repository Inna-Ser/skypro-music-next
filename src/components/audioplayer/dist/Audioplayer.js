"use client";
"use strict";
exports.__esModule = true;
exports.Audioplayer = void 0;
var AudioplayerComponents_1 = require("@/components/audioplayerComponents/AudioplayerComponents");
var VolumeBlock_1 = require("./volumeBlock/VolumeBlock");
var TrackTime_1 = require("./trackTime/TrackTime");
var Audioplayer_module_css_1 = require("./Audioplayer.module.css");
var react_1 = require("react");
var Progressbar_1 = require("./progressbar/Progressbar");
var store_1 = require("@/store/store");
var trackSlice_1 = require("@/store/slices/features/trackSlice");
exports.Audioplayer = function () {
    var audioRef = react_1.useRef(null);
    var _a = react_1.useState(0.5), currentVolume = _a[0], setCurrentVolume = _a[1];
    var _b = react_1.useState(false), isLoop = _b[0], setIsLoop = _b[1];
    var _c = react_1.useState(false), isActive = _c[0], setIsActive = _c[1];
    var dispatch = store_1.useAppDispatch();
    var currentTrack = store_1.useAppSelector(function (state) { return state.tracks.currentTrack; });
    var isPlaying = store_1.useAppSelector(function (state) { return state.tracks.isPlaying; });
    var isShuffle = store_1.useAppSelector(function (state) { return state.tracks.isShuffle; });
    react_1.useEffect(function () {
        if (audioRef.current && (currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.track_file)) {
            audioRef.current.src = currentTrack.track_file;
            audioRef.current.load(); // Загружаем новый трек
            audioRef.current.play()["catch"](function (err) { return console.log(err); });
            dispatch(trackSlice_1.setIsPlaying(true));
        }
    }, [currentTrack, dispatch]);
    react_1.useEffect(function () {
        var handleEnded = function () { return dispatch(trackSlice_1.setNext()); };
        var handleLoadedMetadata = function () {
            var _a;
            if (isPlaying && audioRef.current) {
                audioRef.current.play()["catch"](function (err) { return console.log(err); });
            }
            else {
                (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.pause();
            }
        };
        var currentRef = audioRef.current;
        currentRef === null || currentRef === void 0 ? void 0 : currentRef.addEventListener("ended", handleEnded);
        currentRef === null || currentRef === void 0 ? void 0 : currentRef.addEventListener("loadedmetadata", handleLoadedMetadata);
        return function () {
            currentRef === null || currentRef === void 0 ? void 0 : currentRef.removeEventListener("ended", handleEnded);
            currentRef === null || currentRef === void 0 ? void 0 : currentRef.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [isPlaying, dispatch]);
    var playNextTrack = function () {
        dispatch(trackSlice_1.setNext());
    };
    var togglePlay = function () {
        var _a, _b;
        if ((_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.paused) {
            audioRef.current.play()["catch"](function (err) { return console.log(err); });
            dispatch(trackSlice_1.setIsPlaying(true));
        }
        else {
            (_b = audioRef.current) === null || _b === void 0 ? void 0 : _b.pause();
            dispatch(trackSlice_1.setIsPlaying(false));
        }
    };
    var playRepeatTrack = function () {
        if (audioRef.current) {
            audioRef.current.loop = !audioRef.current.loop;
            setIsLoop(function (prev) { return !prev; });
            console.log("playRepeatTrack is called");
        }
    };
    var playPrevTrack = function () {
        if (audioRef.current) {
            if (audioRef.current.currentTime > 5) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            else {
                dispatch(trackSlice_1.setPrev()); // переключаемся на предыдущий трек
            }
        }
    };
    var toggleShuffle = function () {
        dispatch(trackSlice_1.setIsShuffle(!isActive));
        setIsActive(function (prev) { return !prev; });
    };
    react_1.useEffect(function () {
        if (audioRef && audioRef.current) {
            audioRef.current.volume = currentVolume; // Устанавливаем начальное значение громкости
        }
    }, [audioRef, currentVolume]);
    return (React.createElement(React.Fragment, null,
        React.createElement("audio", { loop: isLoop, ref: audioRef, src: currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.track_file, className: Audioplayer_module_css_1["default"].audioControler, controls: true }),
        React.createElement("div", { className: Audioplayer_module_css_1["default"].bar },
            React.createElement(TrackTime_1.TrackTime, { audioRef: audioRef }),
            React.createElement("div", { className: Audioplayer_module_css_1["default"].barContent },
                React.createElement(Progressbar_1.ProgressBar, { audioRef: audioRef, togglePlay: togglePlay }),
                React.createElement("div", { className: Audioplayer_module_css_1["default"].barPlayerBlock },
                    React.createElement("div", { className: Audioplayer_module_css_1["default"].barPlayer },
                        React.createElement("div", { className: Audioplayer_module_css_1["default"].playerControls },
                            React.createElement(AudioplayerComponents_1.Prev, { playPrevTrack: playPrevTrack }),
                            isPlaying ? (React.createElement(AudioplayerComponents_1.Pause, { togglePause: togglePlay })) : (React.createElement(AudioplayerComponents_1.Play, { togglePlay: togglePlay })),
                            React.createElement(AudioplayerComponents_1.Next, { playNextTrack: playNextTrack }),
                            React.createElement(AudioplayerComponents_1.Repeat, { playRepeatTrack: playRepeatTrack, isLoop: isLoop }),
                            React.createElement(AudioplayerComponents_1.Shuffle, { toggleShuffle: toggleShuffle, isActive: isShuffle })),
                        React.createElement(AudioplayerComponents_1.TrackPlayImage, null),
                        React.createElement("div", { className: Audioplayer_module_css_1["default"].playerTrackPlay },
                            React.createElement("div", { className: Audioplayer_module_css_1["default"].trackPlayContain },
                                React.createElement(AudioplayerComponents_1.TrackPlayAuthor, { name: currentTrack ? currentTrack.name : "No track selected" })),
                            React.createElement(AudioplayerComponents_1.TrackPlayAlbum, { author: currentTrack ? currentTrack.author : "Unknown" }))),
                    React.createElement(VolumeBlock_1.VolumeBlock, { setCurrentVolume: setCurrentVolume, currentVolume: currentVolume }))))));
};

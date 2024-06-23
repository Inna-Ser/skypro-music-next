"use client";
"use strict";
exports.__esModule = true;
exports.Centerblock = void 0;
var Filter_1 = require("@components/filterItem/Filter");
var Centerblock_module_css_1 = require("./Centerblock.module.css");
var PlayList_1 = require("@components/playList/PlayList");
var classnames_1 = require("classnames");
var store_1 = require("@/store/store");
var trackSlice_1 = require("@/store/slices/features/trackSlice");
var react_1 = require("react");
var Api_1 = require("@/api/Api");
var ContentTitle = function () {
    return (React.createElement("div", { className: classnames_1["default"](Centerblock_module_css_1["default"].contentTitle, Centerblock_module_css_1["default"].playlistTitle) },
        React.createElement("div", { className: classnames_1["default"](Centerblock_module_css_1["default"].playlistTitleCol, Centerblock_module_css_1["default"].col01) }, "\u0422\u0440\u0435\u043A"),
        React.createElement("div", { className: classnames_1["default"](Centerblock_module_css_1["default"].playlistTitleCol, Centerblock_module_css_1["default"].col02) }, "\u0418\u0421\u041F\u041E\u041B\u041D\u0418\u0422\u0415\u041B\u042C"),
        React.createElement("div", { className: classnames_1["default"](Centerblock_module_css_1["default"].playlistTitleCol, Centerblock_module_css_1["default"].col03) }, "\u0410\u041B\u042C\u0411\u041E\u041C"),
        React.createElement("div", { className: classnames_1["default"](Centerblock_module_css_1["default"].playlistTitleCol, Centerblock_module_css_1["default"].col04) },
            React.createElement("svg", { className: Centerblock_module_css_1["default"].playlistTitleSvg },
                React.createElement("use", { xlinkHref: "img/icon/sprite.svg#icon-watch" })))));
};
var Search = function () {
    var dispatch = store_1.useAppDispatch();
    var _a = react_1.useState(""), searchString = _a[0], setSearchString = _a[1];
    var tracksList = store_1.useAppSelector(function (state) { return state.tracks.trackList; }); // Извлекаем массив треков из состояния
    var _b = react_1.useState(false), isFiltering = _b[0], setIsFiltering = _b[1];
    var handleSearchChange = function (event) {
        var value = event.target.value.trim();
        setSearchString(value);
        if (value !== "") {
            setIsFiltering(true);
            dispatch(trackSlice_1.setFilter({ searchString: value, tracks: tracksList }));
        }
        else {
            dispatch(trackSlice_1.setFilter({ searchString: "", tracks: tracksList })); // Сбрасываем значение строки поиска в хранилище
        }
    };
    var handleClear = function () {
        console.log(tracksList);
        setIsFiltering(false);
        dispatch(trackSlice_1.setFilter({ tracks: tracksList }));
        dispatch(trackSlice_1.setInitialTracks(tracksList));
        setSearchString(""); // Сброс значения строки поиска в компоненте Search
    };
    return (React.createElement("div", { className: Centerblock_module_css_1["default"].centerblockSearch },
        React.createElement("div", { className: Centerblock_module_css_1["default"].searchIcon },
            React.createElement("svg", { className: Centerblock_module_css_1["default"].searchSvg },
                React.createElement("use", { xlinkHref: "img/icon/sprite.svg#icon-search-dark" }))),
        React.createElement("div", { className: Centerblock_module_css_1["default"].searchContaner },
            React.createElement("input", { className: Centerblock_module_css_1["default"].searchText, type: "search", placeholder: "\u041F\u043E\u0438\u0441\u043A", name: "search", value: searchString, onChange: handleSearchChange }),
            isFiltering === true && (React.createElement("div", { className: Centerblock_module_css_1["default"].clearIcon, onClick: handleClear },
                React.createElement("use", { xlinkHref: "img/icon/sprite.svg#icon-close" }, "\u0441\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430"))))));
};
exports.Centerblock = function () {
    var _a = react_1.useState([]), tracksList = _a[0], setTracksList = _a[1];
    var dispatch = store_1.useAppDispatch();
    react_1.useEffect(function () {
        Api_1.getTracks()
            .then(function (data) {
            setTracksList(data);
            dispatch(trackSlice_1.setInitialTracks(data));
        })["catch"](function (error) {
            new Error(error.message);
        });
    }, [setTracksList, trackSlice_1.setInitialTracks]);
    return (React.createElement("div", { className: classnames_1["default"](Centerblock_module_css_1["default"].mainCenterblock, Centerblock_module_css_1["default"].centerblock) },
        React.createElement(Search, null),
        React.createElement("h2", { className: Centerblock_module_css_1["default"].centerblockH2 }, "\u0422\u0440\u0435\u043A\u0438"),
        React.createElement(Filter_1.Filter, null),
        React.createElement("div", { className: Centerblock_module_css_1["default"].centerblockContent },
            React.createElement(ContentTitle, null),
            React.createElement(PlayList_1.PlayList, null))));
};

"use client";
"use strict";
exports.__esModule = true;
exports.Filter = void 0;
var react_1 = require("react");
var filterYears_1 = require("../../utils/filterYears");
var Filter_module_css_1 = require("./Filter.module.css");
var classnames_1 = require("classnames");
var store_1 = require("@/store/store");
var trackSlice_1 = require("@/store/slices/features/trackSlice");
var FilterAuthor = function (_a) {
    var closeDropdown = _a.closeDropdown, memoize = _a.memoize, tracksList = _a.tracksList;
    var dispatch = store_1.useAppDispatch();
    var uniqueAuthors = react_1.useMemo(function () {
        return Array.from(new Set(tracksList.map(function (track) { return track.author; })));
    }, [tracksList]);
    var handleAuthorChange = memoize(react_1.useCallback(function (author) {
        dispatch(trackSlice_1.setIsFilteringAuthor(true));
        dispatch(trackSlice_1.setFilter({ author: [author], tracks: tracksList })); // Передаем author как массив строк и tracksList
        closeDropdown();
    }, [dispatch, tracksList, closeDropdown]));
    var toggleReset = function () {
        dispatch(trackSlice_1.setFilter({ author: [], tracks: tracksList })); // Сбрасываем фильтр по автору
        dispatch(trackSlice_1.setIsFilteringAuthor(false));
        closeDropdown();
    };
    return (React.createElement("ul", { className: Filter_module_css_1["default"].filterListContaner },
        React.createElement("p", { className: Filter_module_css_1["default"].resetAuthor, onClick: toggleReset }, "Filter reset"),
        uniqueAuthors.map(function (author, index) { return (React.createElement("li", { className: Filter_module_css_1["default"].filterListItem, key: index, onClick: function () {
                handleAuthorChange(author);
            } }, author)); })));
};
var FilterYear = function (_a) {
    var closeDropdown = _a.closeDropdown, memoize = _a.memoize, tracksList = _a.tracksList;
    var dispatch = store_1.useAppDispatch();
    var handleYearChange = memoize(react_1.useCallback(function (year) {
        dispatch(trackSlice_1.setIsSortByYears(true));
        dispatch(trackSlice_1.setFilter({ order: year, tracks: tracksList }));
        closeDropdown();
    }, [dispatch, tracksList, closeDropdown]));
    return (React.createElement("ul", { className: Filter_module_css_1["default"].filterListContaner }, filterYears_1.filterYears.map(function (filterYear, index) { return (React.createElement("li", { className: Filter_module_css_1["default"].filterListItem, key: index, onClick: function () {
            handleYearChange(filterYear.year);
        } }, filterYear.year)); })));
};
var FilterGenre = function (_a) {
    var closeDropdown = _a.closeDropdown, memoize = _a.memoize, tracksList = _a.tracksList;
    var dispatch = store_1.useAppDispatch();
    var uniqueGenre = react_1.useMemo(function () {
        return Array.from(new Set(tracksList.map(function (track) { return track.genre; })));
    }, [tracksList]);
    var handleGenreChange = memoize(react_1.useCallback(function (genre) {
        dispatch(trackSlice_1.setIsFilteringGenre(true));
        dispatch(trackSlice_1.setFilter({}));
        closeDropdown();
        null;
    }, [dispatch, tracksList, closeDropdown]));
    var toggleReset = function () {
        dispatch(trackSlice_1.setFilter({ genre: [], tracks: tracksList })); // Сбрасываем фильтр по жанру
        dispatch(trackSlice_1.setIsFilteringGenre(false));
        closeDropdown();
    };
    return (React.createElement("div", { className: Filter_module_css_1["default"].filterListGenre },
        React.createElement("ul", { className: Filter_module_css_1["default"].filterListContaner },
            React.createElement("p", { className: Filter_module_css_1["default"].resetAuthor, onClick: toggleReset }, "Filter reset"),
            " ",
            uniqueGenre.map(function (genre, index) { return (React.createElement("li", { className: Filter_module_css_1["default"].filterListItem, key: index, onClick: function () { return handleGenreChange(genre); } }, genre)); }))));
};
exports.Filter = function () {
    var _a = react_1.useState(null), visible = _a[0], setVisible = _a[1];
    var tracksList = store_1.useAppSelector(function (state) { return state.tracks.trackList; });
    var setIsFilteringAuthor = store_1.useAppSelector(function (state) { return state.tracks.isFilteringAuthor; });
    var setIsFilteringGenre = store_1.useAppSelector(function (state) { return state.tracks.isFilteringGenre; });
    var filteredAuthorCount = store_1.useAppSelector(function (state) { return state.tracks.filterPlaylistByAuthor.length; });
    var filteredGenreCount = store_1.useAppSelector(function (state) { return state.tracks.filterPlaylistByGenre.length; });
    function memoize(fn) {
        var cache = {};
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var key = args.toString();
            if (key in cache)
                return cache[key];
            else {
                var result = fn.apply(this, args);
                cache[key] = result;
                return result;
            }
        };
    }
    var toggleVisibility = function (value) {
        if (value === visible) {
            setVisible(null);
        }
        else {
            setVisible(value);
        }
    };
    var closeDropdown = function () {
        setVisible(null);
    };
    return (React.createElement("div", { className: Filter_module_css_1["default"].centerblockFilter },
        React.createElement("div", { className: Filter_module_css_1["default"].filterTitle }, "\u0418\u0441\u043A\u0430\u0442\u044C \u043F\u043E:"),
        React.createElement("div", { className: Filter_module_css_1["default"].filterWrapper },
            setIsFilteringAuthor && ( // Отображение currentMarker только если isFiltering === true
            React.createElement("div", { className: Filter_module_css_1["default"].currentMarker }, filteredAuthorCount)),
            React.createElement("div", { className: visible === "author"
                    ? Filter_module_css_1["default"].filterButton + " " + Filter_module_css_1["default"].active
                    : Filter_module_css_1["default"].filterButton, onClick: function () { return toggleVisibility("author"); } }, "\u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044E"),
            visible === "author" && (React.createElement(FilterAuthor, { tracksList: tracksList, memoize: memoize, closeDropdown: closeDropdown }))),
        React.createElement("div", { className: Filter_module_css_1["default"].filterWrapper },
            React.createElement("div", { className: visible === "years"
                    ? classnames_1["default"](Filter_module_css_1["default"].filterButton, Filter_module_css_1["default"].active)
                    : Filter_module_css_1["default"].filterButton, onClick: function () { return toggleVisibility("years"); } }, "\u0433\u043E\u0434\u0443 \u0432\u044B\u043F\u0443\u0441\u043A\u0430"),
            visible === "years" && (React.createElement(FilterYear, { memoize: memoize, closeDropdown: closeDropdown, tracksList: tracksList }))),
        React.createElement("div", { className: Filter_module_css_1["default"].filterWrapper },
            setIsFilteringGenre && (React.createElement("div", { className: Filter_module_css_1["default"].currentMarker }, filteredGenreCount)),
            React.createElement("div", { className: visible === "genre"
                    ? classnames_1["default"](Filter_module_css_1["default"].filterButton, Filter_module_css_1["default"].active)
                    : Filter_module_css_1["default"].filterButton, onClick: function () { return toggleVisibility("genre"); } }, "\u0436\u0430\u043D\u0440\u0443"),
            visible === "genre" && (React.createElement(FilterGenre, { tracksList: tracksList, memoize: memoize, closeDropdown: closeDropdown })))));
};

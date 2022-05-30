"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameJoke = void 0;
const isSameJoke = (reports, currentJoke) => {
    return reports.filter((report) => report.joke === currentJoke).length > 0
        ? true
        : false;
};
exports.isSameJoke = isSameJoke;

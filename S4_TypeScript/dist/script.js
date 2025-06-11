"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
let price = 0;
const post = {
    title: "",
    meta: "",
    body: "",
    thumbnail: "",
};
const userPost = {
    body: "",
    title: "",
};
const postMetaLength = (_a = post.meta) === null || _a === void 0 ? void 0 : _a.length;
(_b = userPost.meta) === null || _b === void 0 ? void 0 : _b.length;
userPost.meta = "";
const posts = [];
posts.push({ body: "", title: "" });
const newUser = {
    id: "1",
    name: "JayT",
    email: "test@test.com",
    role: "user",
    dob: new Date(),
    favorites: [],
};
const admin = {
    id: "2",
    name: "Max",
    role: "admin",
    email: "admin@test.com",
    posts: [],
};
let variable = true;
variable = "hello";
variable = 10;
const throwError = (message, param2) => {
    throw new Error(message);
};
const calculateMyAge = (dob) => {
    return new Date(Date.now()).getFullYear() - dob;
};
const myAge = calculateMyAge(1995);
console.log(myAge);
const fetchFromAPI = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(path, { method: "GET " });
    if (res.ok) {
        return (yield res.json());
    }
    return "Something is not write";
});
fetchFromAPI("/api/users").then((res) => {
    if (typeof res === "string") {
        console.log("There is an error");
    }
    else {
        res.map((user) => { });
    }
});
fetchFromAPI("/api/users").then((res) => {
    if (typeof res === "string") {
        console.log("There is an error");
    }
    else {
        res.map((post) => { });
    }
});

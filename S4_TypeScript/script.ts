let price = 0;

// const input = document.getElementById("price-input") as HTMLInputElement;

// const button = document.getElementById("submit") as HTMLButtonElement | null;

// button?.addEventListener("click", (e) => {
//   price = +input.value;
//   console.log(price.toFixed(2));
// });

// variable : type_of_this_variable = data_with_the_type_of_this_variable
// let user: string = "John";

type Post = {
  title: string;
  body: string;
  meta?: string;
  thumbnail?: string;
};

const post: Post = {
  title: "",
  meta: "",
  body: "",
  thumbnail: "",
};

const userPost: Post = {
  body: "",
  title: "",
};

const postMetaLength = post.meta?.length;
userPost.meta?.length;

userPost.meta = "";

const posts: Post[] = [];

posts.push({ body: "", title: "" });

interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface User extends BaseUser {
  dob: Date;
  favorites?: string[];
}

interface Admin extends BaseUser {
  posts?: Post[];
}

const newUser: User = {
  id: "1",
  name: "JayT",
  email: "test@test.com",
  role: "user",
  dob: new Date(),
  favorites: [],
};

const admin: Admin = {
  id: "2",
  name: "Max",
  role: "admin",
  email: "admin@test.com",
  posts: [],
};

// any and never type

let variable: any = true;
variable = "hello";
variable = 10;

// const users: never[] = [];

const throwError = (message: string, param2?: number) => {
  throw new Error(message);
};

// throwError("This is an error", 404);
// throwError("This is an error");

const calculateMyAge = (dob: number): number => {
  // calculate your age by given dob
  return new Date(Date.now()).getFullYear() - dob;
};

const myAge: number = calculateMyAge(1995);
console.log(myAge);

// Generics

// function identity<T>(arg: T): T {
//   return arg;
// }

// identity(10);
// identity("Hello World");
// identity(true);

const fetchFromAPI = async <T>(path: string) => {
  const res = await fetch(path, { method: "GET " });
  if (res.ok) {
    return (await res.json()) as T;
  }
  return "Something is not write";
};

fetchFromAPI<User[]>("/api/users").then((res) => {
  if (typeof res === "string") {
    console.log("There is an error");
  } else {
    res.map((user) => {});
  }
});

fetchFromAPI<Post[]>("/api/users").then((res) => {
  if (typeof res === "string") {
    console.log("There is an error");
  } else {
    res.map((post) => {});
  }
});

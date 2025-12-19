import instance from "./axios";

export const loginApi = (email :string, password : string) => {
    return instance.post("/api/v1/user/login", {
        email,
        password,
    });
};

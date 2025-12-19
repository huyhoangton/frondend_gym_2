import axios from "./axios";

export const userApi = {
    getProfile: async (email: string) => {
        const res = await axios.get(`/api/v1/user/email/${email}`);
        return res.data.data; 
    },

    updateUser: async (id: string, userData: any) => {
        const res = await axios.put(`/api/v1/user/${id}`, userData);
        return res.data.data; 
    },
    loginApi: async (email: string, password: string) => {
        const res = await axios.post(`/api/v1/user/login`, { email, password });
        return res.data.data; 
    }
};

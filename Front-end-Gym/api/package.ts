import axios from "./axios";

export const gymApi = {
    getPackages: async () => {
        const res = await axios.get("/api/v1/category");
        return res.data.data; 
    },
    getCategoryById: async(id : String) => {
        const res = await axios.get(`/api/v1/category/${id}`);
        return res.data.data;
    },
    getCategoryByName: async(name : String) => {
        const res = await axios.get(`/api/v1/category/name/${name}`);
        return res.data.data;
    }
};

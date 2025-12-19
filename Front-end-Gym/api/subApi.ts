import axios from "axios";
export const subApi = {
    getSubByPackageId: async(user : String) => {
        const res = await axios.get(`/api/v1/sub/user/${user}`);
        return res.data.data;
    }

}
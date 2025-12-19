import axios from "./axios"; // 👈 PHẢI DÙNG INSTANCE

export const paymentApi = {
    getPaymentByUserId: async (userId: string) => {
        const res = await axios.get(`/api/v1/payment/user/${userId}`);
        return res.data.data;
    },

    createVNPay: async (amount: number, orderId: string) => {
        const res = await axios.post("/api/v1/payment/create", {
            amount,
            orderId
        });
        return res.data.url;
    }
};

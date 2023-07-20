import axiosInstance from "../utils/axios";

export async function getDealFields() {
        return axiosInstance.get("dealFields");
    }

export async function setDealField(body) {
        return axiosInstance.post("dealFields", body);
    }

export async function addDeal(body) {
        return axiosInstance.post("deals", body);
    }


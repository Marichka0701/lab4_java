import {axiosService} from "./axios.service";
import {endPoints} from "../configs/urls";

const authService = {
    login: async (data) => {
        try {
            const res = await axiosService.post(endPoints.api.auth, data);
            console.log(res);
            localStorage.setItem("token", JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    signUp: async (data) => {
        try {
            const res = await axiosService.post(endPoints.api.users, data);
            console.log(res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export {
    authService,
}
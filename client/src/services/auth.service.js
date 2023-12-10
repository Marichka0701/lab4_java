import {axiosService} from "./axios.service";
import {endPoints} from "../configs/urls";

const authService = {
    login: async (data) => {
        try {
            const res = await axiosService.post(endPoints.auth.login, data);

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    signUp: async (data) => {
        try {
            const res = await axiosService.post(endPoints.auth.register, data);
            console.log(res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
}

export {
    authService,
}
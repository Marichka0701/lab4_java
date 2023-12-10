import {axiosService} from "./axios.service";
import {endPoints} from "../configs/urls";

const userService = {
    getById: async (id) => {
        try {
            const res = await axiosService.get(`${endPoints.users.base}/${id}`);

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    updateById: async (id, data) => {
        try {
            const res = await axiosService.patch(`${endPoints.users.base}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export {
    userService
}
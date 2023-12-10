import {axiosService} from "./axios.service";
import {endPoints} from "../configs/urls";

const pizzaService = {
    getAll: async () => {
        try {
            const res = await axiosService.get(endPoints.pizza.base);

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const res = await axiosService.get(`${endPoints.pizza.base}/${id}`);

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    createOrder: async (data) => {
        try {
            const res = await axiosService.post(endPoints.pizza.base, data, {
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
    pizzaService
}
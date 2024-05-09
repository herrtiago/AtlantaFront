import axios from "axios";
import { IResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";

const API_BASE_URL = "http://mediafile-cliente1.bucaramanga.upb.edu.co/api/User/";

export class UserService {

    public static Login = (email: string, password: string): Promise<IResponse<string>> => {
        return new Promise((res, rej) => {
            axios.post<IResponse<string>>(API_BASE_URL + "login", { email, password })
                .then(r => res(r.data))
                .catch(r => {
                    res({
                        data: null,
                        errors: [],
                        success: false
                    })
                });
        });
    }

    public static Register = (email: string, fullname: string, password: string): Promise<IResponse<string>> => {
        return new Promise((res, rej) => {
            axios.post<IResponse<string>>(API_BASE_URL + "register", { email, fullname, password })
                .then(r => res(r.data))
                .catch(r => {
                    res({
                        data: null,
                        errors: [],
                        success: false
                    })
                });
        });
    }

    public static GetCurrentUser = (): Promise<IResponse<IUser>> => {
        return new Promise((res, rej) => {
            const token = localStorage.getItem("token");
            axios.get<IResponse<IUser>>(API_BASE_URL, { headers: { Authorization: `Bearer ${token}` } })
                .then(r => res(r.data))
                .catch(r => {
                    res({
                        data: null,
                        errors: [],
                        success: false
                    })
                });
        });
    }

}
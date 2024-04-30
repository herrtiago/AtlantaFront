import { create } from "zustand"
import { IUser } from "../interfaces/IUser";
import { UserService } from "../services/UserService";
import * as alertifyjs from "alertifyjs";

export type IUseAuth = {
    user: IUser | null
    auth: () => void
}

export const useAuth = create<IUseAuth>((set, get) => ({
    user: null,
    auth: async () => {
        const response = await UserService.GetCurrentUser();

        if(response.success) {
            set(s => ({
                user: response.data
            }));
        } else {
            alertifyjs.error(response.errors.join(", "));
        }
    }
}));
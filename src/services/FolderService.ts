import axios from "axios";
import { IFolderFiles } from "../interfaces/IFolderFiles";
import { IResponse } from "../interfaces/IResponse";

const API_BASE_URL = "https://localhost:7103/Folder/";

export class FolderService {

    public static Create = (userId: string, folderId: string, name: string): Promise<IResponse<string>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.post<IResponse<string>>(API_BASE_URL + folderId, { name }, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Rename = (userId: string, folderId: string, name: string): Promise<IResponse<boolean>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.patch<IResponse<boolean>>(API_BASE_URL + folderId, { name }, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Move = (userId: string, folderId: string, newFolderId: string): Promise<IResponse<boolean>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.put<IResponse<boolean>>(API_BASE_URL + folderId, { newFolderId }, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Delete = (userId: string, folderId: string): Promise<IResponse<boolean>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.delete<IResponse<boolean>>(API_BASE_URL + folderId, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Share = (userId: string, folderId: string, users: string[]): Promise<IResponse<boolean>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.post<IResponse<boolean>>(API_BASE_URL + folderId + "/share", { users }, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Fetch = (userId: string, folderId: string): Promise<IResponse<IFolderFiles>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.get<IResponse<IFolderFiles>>(API_BASE_URL + folderId, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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
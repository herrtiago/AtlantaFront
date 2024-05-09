import axios from "axios";
import { IResponse } from "../interfaces/IResponse";
import { ICreateFile } from "../interfaces/ICreateFile";
import { IFile } from "../interfaces/IFile";

const API_BASE_URL = "http://mediafile-cliente1.bucaramanga.upb.edu.co/api/File/";

export class FileService {

    public static Create = (userId: string, file: ICreateFile): Promise<IResponse<string>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.post<IResponse<string>>(API_BASE_URL + "upload", file, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Rename = (userId: string, fileId: string, name: string, extension: string): Promise<IResponse<boolean>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.patch<IResponse<boolean>>(API_BASE_URL + fileId, { name, extension }, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Move = (userId: string, fileId: string, newFolderId: string): Promise<IResponse<boolean>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.put<IResponse<boolean>>(API_BASE_URL + fileId, { newFolderId }, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Delete = (userId: string, fileId: string): Promise<IResponse<boolean>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.delete<IResponse<boolean>>(API_BASE_URL + fileId, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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

    public static Fetch = (userId: string, fileId: string): Promise<IResponse<IFile>> => {
        return new Promise((res) => {

            const token = localStorage.getItem("token");

            axios.get<IResponse<IFile>>(API_BASE_URL + fileId, { params: { userId }, headers: { Authorization: `Bearer ${token}` } })
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
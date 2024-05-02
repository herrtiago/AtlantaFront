import { IFile } from "../interfaces/IFile";
import { saveAs } from 'file-saver';
import * as alertify from "alertifyjs"

export const downloadFile = (file: IFile) => {
    try {
        const fileName = file.name + "." + file.extension;
        let bstr = atob(file.content);
        let n = bstr.length;
        let uint8Array = new Uint8Array(n);
        while (n--) {
            uint8Array[n] = bstr.charCodeAt(n);
        }
        let _file = new File([uint8Array], fileName, { type: file.mimeType });
        saveAs(_file, fileName);
    } catch (err) {
        alertify.error((err as Error).message);
    }
}
export function getBase64(file: File): Promise<string> {
    return new Promise((res, rej) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            if(typeof reader.result == "string"){
                res(reader.result);
            } else {
                rej("Invalid type");
            }
        };
        reader.onerror = function (error) {
            rej(error);
        };
    });
}
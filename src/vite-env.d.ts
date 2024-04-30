/// <reference types="vite/client" />

declare module "alertifyjs" {

    interface IProperties {
        
        delay?: number | undefined;

        labels?: ILabels | undefined;

        buttonFocus?: string | undefined;

        buttonReverse?: boolean | undefined;
    }

    interface ILabels {
        ok?: string | undefined;
        cancel?: string | undefined;
    }

    type alert = (title: string, message: string, fn?: Function, cssClass?: string) => IAlertifyStatic;

    type confirm = (title: string, message: string, fn?: Function, cancel?: Function) => IAlertifyStatic;

    type extend = (type: string) => (message: string, wait?: number) => IAlertifyStatic;

    type init = () => void;

    type log = (message: string, type?: string, wait?: number) => IAlertifyStatic;

    type prompt = (message: string, fn?: Function, placeholder?: string, cssClass?: string) => IAlertifyStatic;

    type success = (message: string) => IAlertifyStatic;

    type error = (message: string) => IAlertifyStatic;

    type set = (args: IProperties) => void;

    type debug = () => void;

    export const alert: alert;
    export const confirm: confirm;
    export const extend: extend;
    export const init: init;
    export const log: log;
    export const prompt: prompt;
    export const success: success;
    export const error: error;
    export const set: set;
    export const debug: debug;
}
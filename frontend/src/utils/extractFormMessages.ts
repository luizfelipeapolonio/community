import { IApiResponse } from "../types/shared.types";

export const extractFormMessages = (array: IApiResponse | null): string[] | undefined => {
    if(!array) return;
    
    if(typeof array.message !== "string") {
        let newArray: string[];
        let values: string[] = [];

        newArray = array.message.map((item: object) => {
            return Object.values(item)[0];
        });

        newArray.map((item) => {
            Object.values(item).forEach((value: string) => {
                values.push(value);
            });
        });

        return values;
    }
}
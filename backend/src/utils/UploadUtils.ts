import { ITypedRequestBody } from "../types/SharedTypes";
import { ICreatePostBody } from "../types/PostTypes";

export class UploadUtils {

    createPostUploadValidation(req: ITypedRequestBody<ICreatePostBody>): boolean {
        const { title, tags } = req.body;
        let upload: boolean = true;

        if(!title || !tags) {
            upload = false;
        }

        if(title && title.length < 3) {
            upload = false;
        }
        
        if(tags && tags[0] === "") {
            upload = false;
        }

        return upload;
    }
}
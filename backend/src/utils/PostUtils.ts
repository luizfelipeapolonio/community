import { ITypedRequestBody } from "../types/SharedTypes";
import { ICreatePostBody } from "../types/PostTypes";

export class PostUtils {

    createPostUploadValidation(req: ITypedRequestBody<ICreatePostBody>): boolean {
        const { title, tags } = req.body;
        let status: boolean = true;

        if(!title || !tags) {
            status = false;
        }

        if(title && title.length < 3) {
            status = false;
        }
        
        if(tags && tags[0] === "") {
            status = false;
        }

        return status;
    }
}
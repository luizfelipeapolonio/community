import { IUserUpdateBody } from "../types/UserTypes";
import { ITypedRequestBody } from "../types/SharedTypes";
import { ICreatePostBody } from "../types/PostTypes";

export class UploadUtils {
    userUpdateUploadValidation(req: ITypedRequestBody<IUserUpdateBody>): boolean {
        const { name, password } = req.body;
        let upload: boolean = true;

        if(name && name.length < 5) {
            upload = false;
        }

        if(password && password.length < 5) {
            upload = false;
        }

        return upload;
    }

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
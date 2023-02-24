import multer, { StorageEngine, Multer } from "multer";
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs";

import { UploadUtils } from "../utils/UploadUtils";

export class ImageUpload {
    private uploadFolder: string = path.basename(`${__dirname}/uploads`);

    private imageStorage(): StorageEngine {
        // Destination to image storage
        return multer.diskStorage({
            destination: (req, file, cb) => {
                // Check if upload folder exists
                if(!fs.existsSync(this.uploadFolder)) {
                    // Create upload folder if it doesn't exist
                    fs.mkdirSync(this.uploadFolder);
                    fs.mkdirSync(`${this.uploadFolder}/posts`);
                    fs.mkdirSync(`${this.uploadFolder}/users`);
                }

                let folder: string = "";

                if(req.baseUrl.includes("users")) {
                    folder = "users";
                } else if(req.baseUrl.includes("posts")) {
                    folder = "posts";
                }

                cb(null, `${this.uploadFolder}/${folder}/`);
            },
            filename: (req, file, cb) => {
                cb(null, crypto.randomUUID() + path.extname(file.originalname));
            }
        });
    }

    imageUpload(): Multer {
        return multer({
            storage: this.imageStorage(),
            fileFilter(req, file, cb) {
                const upload = new UploadUtils();

                if(!file.originalname.match(/\.(png|jpg)$/i)) {
                    // upload only png and jpg formats
                    req.body.error = true;
                    return cb(null, false);
                    // return cb(new Error("Por favor, envie apenas png ou jpg!"));
                }

                if(req.baseUrl.includes("users") && req.method === "PATCH") {
                    console.log("\n ==== Teste ====> " + upload.userUpdateUploadValidation(req) + "\n");
                    return cb(null, upload.userUpdateUploadValidation(req));
                } else if(req.baseUrl.includes("posts") && req.method === "POST") {
                    console.log("\n ==== Teste ====> " + upload.postCreateUploadValidation(req) + "\n");
                    return cb(null, upload.postCreateUploadValidation(req));
                }

            }
        });
    }
}
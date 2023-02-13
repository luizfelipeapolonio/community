import multer, { StorageEngine, Multer } from "multer";
import path from "node:path";
import crypto from "node:crypto";

export class ImageUpload {
    private imageStorage(): StorageEngine {
        // Destination to image storage
        return multer.diskStorage({
            destination: (req, file, cb) => {
                let folder: string = "";

                if(req.baseUrl.includes("users")) {
                    folder = "users";
                } else if(req.baseUrl.includes("posts")) {
                    folder = "posts";
                }

                cb(null, `uploads/${folder}/`);
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
                if(!file.originalname.match(/\.(png|jpg)$/i)) {
                    // upload only png and jpg formats
                    return cb(new Error("Por favor, envie apenas png ou jpg!"));
                }
                cb(null, true);
            }
        });
    }
}
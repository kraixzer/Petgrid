import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileUploadService {
    public async upload(file: Express.Multer.File, file_name: string) {
        return this.uploadS3(file.buffer, file_name);
    }

    private async uploadS3(file: Buffer, file_name: string) {
        const client = this.getS3();
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: "public-images/" + file_name.toLowerCase(),
            Body: file
        });
        return await client.send(command);
    }

    private getS3() {
        return new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_KEY_SECRET
            },
            region: process.env.AWS_S3_REGION
        });
    }
}

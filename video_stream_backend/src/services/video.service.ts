import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model ,Schema} from "mongoose";
import { createReadStream, statSync } from "fs";
import { join } from "path";
import { Request, Response } from "express";
import { Video, VideoDocument } from "src/models/video.schema";


@Injectable()

export class VideoService {
    constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) { }


    async createVideo(video: Object): Promise<Video> {
        return this.videoModel.create(video)
    }

    async readVideo(id): Promise<Video | Video[]> {

        if (id.id) {
            return this.videoModel.findOne({ _id: id.id }).populate("createdBy").exec();
        }
        return this.videoModel.find({}).populate("createdBy").exec();
    }

    async update(id: string, video: Video): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(id, video, { new: true })
    }
    async delete(id: string): Promise<any> {
        return this.videoModel.findByIdAndDelete(id)
    }


    async streamVideo(id: string, response: Response, request: Request) {
        try {
            const data = await this.videoModel.findOne({ _id: id })
            if (!data) {
                throw new NotFoundException(null, 'VideoNotFound')
            }
            const { range } = request.headers;
            if (range) {
                const { video } = data;
                const videoPath = statSync(join(process.cwd(), `./public/${video}`))
                const CHUNK_SIZE = 1 * 1e6;
                const start = Number(range.replace(/\D/g, ''));
                const end = Math.min(start + CHUNK_SIZE, videoPath.size - 1);
                const videoLength = end - start + 1;
                response.status(206)
                response.header({
                    'Content-Range': `bytes ${start}-${end}/${videoPath.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-length': videoLength,
                    'Content-Type': 'video/mp4',
                })
                const videoStream = createReadStream(join(process.cwd(), `./public/${video}`), { start, end });
                videoStream.pipe(response);
            } else {
                throw new NotFoundException(null, 'range not found')
            }

        } catch (e) {
            console.error(e)
            throw new ServiceUnavailableException()
        }
    }

}
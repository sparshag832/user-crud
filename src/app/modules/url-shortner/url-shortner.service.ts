import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Url } from 'src/app/entities/url.entity'
import { Model } from 'mongoose';
import { GetAllUrlsQuery, GetAllUrlsResponse, UrlData } from 'src/app/types/url.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UrlShortnerService {
    constructor(
        @InjectModel(Url.name)
        private UrlModel: Model<Url>,
    ) { }

    async createUrl(data: UrlData): Promise<string> {
        // Generate a short code based on the original URL
        const { originalUrl, userId } = data
        const existing = await this.UrlModel.findOne({ originalUrl, userId });
        if (existing) {
            return existing.shortCode;
        }
        const shortCode = this.generateShortCode(originalUrl);
        await this.UrlModel.create({
            urlId: uuidv4(),
            originalUrl: data.originalUrl,
            shortCode,
            userId: userId,
            createdAt: new Date(),
        });
        return shortCode;
    }
    private generateShortCode(originalUrl: string): string {
        // Create a SHA256 hash of the URL and take the first 6 characters
        return crypto
            .createHash('sha256')
            .update(originalUrl)
            .digest('hex')
            .substring(0, 6);
    }

    async getOriginalUrl(shortCode: string): Promise<string> {
        const url = await this.UrlModel.findOne({ "shortCode": shortCode })
        if (url) {
            return url.originalUrl
        }
        return 'URL not found'
    }

    async getAllUrls(data: GetAllUrlsQuery): Promise<GetAllUrlsResponse> {
        const { userId, page = 1, limit = 10 } = data;
        const query: any = {};

        if (userId) {
            query.userId = userId;
        }

        const skip = (page - 1) * limit;

        const [urls, total] = await Promise.all([
            this.UrlModel.find(query).skip(skip).limit(limit).exec(),
            this.UrlModel.countDocuments(query),
        ]);
        return { data: urls, count: total };
    }

    async deleteUrlById(id: string): Promise<string> {
        const url = await this.UrlModel.findOneAndDelete({ urlId: id });
        if (url) {
            return 'URL deleted successfully';
        }
        return 'URL not found';
    }
}

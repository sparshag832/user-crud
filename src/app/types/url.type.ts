import { Url } from "src/app/entities/url.entity";

export interface UrlData {
    originalUrl: string;
    userId: string;
  }

  export interface GetAllUrlsQuery {
    userId?: string;
    page?: number;
    limit?: number;
  }

  export interface GetAllUrlsResponse {
    data: Url[];
    count: number;
  }
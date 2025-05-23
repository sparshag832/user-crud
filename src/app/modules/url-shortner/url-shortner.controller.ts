import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateShortUrlDto, GetAllUrlsDto } from './dto/url.dto';
import { UrlShortnerService } from './url-shortner.service';

@Controller('url-shortner')
export class UrlShortnerController {
    constructor(
        private readonly _urlShortnerService:UrlShortnerService,
    ){}

    @Post('generateUrl')
    async generateUrl(@Body() data:CreateShortUrlDto){
        const shortUrl=await this._urlShortnerService.createUrl(data)
    }

  @Get('get/:shortCode')
  async getUrl(@Param('shortCode') shortCode: string) {
    return await this._urlShortnerService.getOriginalUrl(shortCode);
  }

  // 2. Get all URLs (optional userId, pagination)
  @Get('getAll')
  async getAllUrls(@Query() request: GetAllUrlsDto) {
    return await this._urlShortnerService.getAllUrls(request);
  }

  // 3. Delete URL by ID
  @Delete(':id')
  async deleteUrlById(@Param('id') id: string) {
    return await this._urlShortnerService.deleteUrlById(id);
  }
}

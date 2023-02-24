import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDto } from '../../../dto/create-post.dto';

@Controller('mongo')
export class ElasticController {
  constructor() {}
  @Get()
  async findPosts(@Query('term') term: string) {
    return null;
  }
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return null;
  }
}

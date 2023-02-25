import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDto } from '../../../dto/create-post.dto';
import { InsertPostInMongoUseCase } from '../use-cases/insert-post-in-mongo.useCase';
import { FindPostInMongoUseCase } from '../use-cases/find-post-in-mongo.useCase';

@Controller('mongo')
export class MongoController {
  constructor(
    private readonly insertPostInMongoUseCase: InsertPostInMongoUseCase,
    private readonly findPostInMongoUseCase: FindPostInMongoUseCase,
  ) {}
  @Get()
  async findPosts(@Query('term') term: string) {
    const result = await this.findPostInMongoUseCase.execute(term);
    return result;
  }
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return await this.insertPostInMongoUseCase.execute(post);
  }
}

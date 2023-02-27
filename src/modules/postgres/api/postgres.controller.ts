import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDto } from '../../../dto/create-post.dto';
import { InsertPostInPostgresUseCase } from '../use-cases/insert-post-in-postgres.useCase';
import { FindPostInPostgresUseCase } from '../use-cases/find-post-in-postgres.useCase';

@Controller('postgres')
export class PostgresController {
  constructor(
    private readonly insertPostInPostgresUseCase: InsertPostInPostgresUseCase,
    private readonly findPostInPostgresUseCase: FindPostInPostgresUseCase,
  ) {}
  @Get()
  async findPosts(@Query('term') term: string) {
    return await this.findPostInPostgresUseCase.execute(term);
  }
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return await this.insertPostInPostgresUseCase.execute(post);
  }
}

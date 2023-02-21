import { Controller, Get, Query } from '@nestjs/common';
import { FindPostUseCase } from '../use-cases/find-post.useCase';

@Controller('elastic')
export class ElasticController {
  constructor(private readonly findPostUseCase: FindPostUseCase) {}
  @Get()
  async findPosts(@Query() term: string) {
    return null;
  }
}

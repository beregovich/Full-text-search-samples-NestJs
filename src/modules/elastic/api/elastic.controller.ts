import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { FindPostUseCase } from '../use-cases/find-post.useCase';
import { CreatePostDto } from '../../../dto/create-post.dto';
import { InsertPostInEsUseCase } from '../use-cases/insert-post-in-es.useCase';
import { GetAutocompleteUseCase } from '../use-cases/get-autocomplete.useCase';
import { CreateIndexUseCase } from '../use-cases/create-index.useCase';

@Controller('elastic')
export class ElasticController {
  constructor(
    private readonly findPostUseCase: FindPostUseCase,
    private readonly getAutocompleteUseCase: GetAutocompleteUseCase,
    private readonly insertPostInEsUseCase: InsertPostInEsUseCase,
    private readonly createIndexUseCase: CreateIndexUseCase,
  ) {}
  @Get()
  async findPosts(@Query('term') term: string) {
    return await this.findPostUseCase.execute(term);
  }
  @Get('autocomplete')
  async getAutocomplete(@Query('term') term: string) {
    return await this.getAutocompleteUseCase.execute(term);
  }
  @Put()
  async createPost(@Body() post: CreatePostDto) {
    return await this.insertPostInEsUseCase.execute(post);
  }
  @Post()
  async createIndex() {
    return await this.createIndexUseCase.execute();
    //
  }
}

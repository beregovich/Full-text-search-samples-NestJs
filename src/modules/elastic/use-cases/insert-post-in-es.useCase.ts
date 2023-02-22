import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Post } from '../dto/create-post.dto';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InsertPostInEsUseCase {
  constructor(
    private readonly elasticService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}
  async execute(post: Post) {
    const index = this.configService.get('INDEX');
    console.log(index);
    return this.elasticService.create({
      id: uuidv4(),
      index,
      document: {
        date: new Date(),
        content: post.content,
      },
    });
  }
}

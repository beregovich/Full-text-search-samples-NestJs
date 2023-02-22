import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  indicesCreateSettingsRequest,
  samplePostMapping,
} from '../infrastructure/sample-post.mapping';
import { v4 as uuidv4 } from 'uuid';
import { CreateRequest } from '@elastic/elasticsearch/lib/api/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateIndexUseCase {
  index: string;
  constructor(
    private readonly elasticService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {
    this.index = configService.get('INDEX') || 'sample_index';
  }
  async execute() {
    try {
      const checkIndex = await this.elasticService.indices.exists({
        index: this.index,
      });
      if (!checkIndex) {
        return this.elasticService.indices.create({
          index: this.index,
          body: {
            mappings: samplePostMapping,
            settings: indicesCreateSettingsRequest,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

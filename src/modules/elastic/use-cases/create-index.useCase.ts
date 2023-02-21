import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  indicesCreateSettingsRequest,
  samplePostMapping,
} from '../infrastructure/sample-post.mapping';
import { v4 as uuidv4 } from 'uuid';
import { CreateRequest } from '@elastic/elasticsearch/lib/api/types';
//import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateIndexUseCase {
  index: string;
  constructor(private readonly elasticService: ElasticsearchService) {
    this.index = 'sample_index';
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
      console.log(JSON.stringify(err));
    }
  }

  async insertDataInES(content: string) {
    const Request: CreateRequest = {
      id: new Date().getMilliseconds().toString(),
      index: this.index,
      document: {
        date: new Date(),
        content,
      },
    };
    const inserted = this.elasticService.create({
      id: uuidv4(),
      index: this.index,
      body: Request,
    });
    console.log('inserted: ' + inserted);
    return inserted;
  }
}

import { ElasticsearchService } from '@nestjs/elasticsearch';

export class InsertPostInEsUseCase {
  index: string;
  constructor(private readonly elasticService: ElasticsearchService) {
    this.index = 'sample_index';
  }
}

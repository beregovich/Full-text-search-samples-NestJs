import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CreateIndexUseCase } from './use-cases/create-index.useCase';
import { ConfigService } from '@nestjs/config';
import { ElasticController } from './api/elastic.controller';
import { FindPostUseCase } from './use-cases/find-post.useCase';
import { InsertPostInEsUseCase } from './use-cases/insert-post-in-es.useCase';
import { GetAutocompleteUseCase } from './use-cases/get-autocomplete.useCase';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          node: configService.get('ELASTIC_NODE') || 'http://localhost:9200',
          // auth: {
          //   password: configService.get('ELASTICSEARCH_PASSWORD') || '',
          //   username: configService.get('ELASTICSEARCH_USERNAME') || '',
          // },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    CreateIndexUseCase,
    FindPostUseCase,
    InsertPostInEsUseCase,
    GetAutocompleteUseCase,
  ],
  controllers: [ElasticController],
})
export class ElasticModule implements OnModuleInit {
  constructor(private readonly createIndexUseCase: CreateIndexUseCase) {}
  async onModuleInit() {
    // const result = await this.createIndexUseCase.execute();
    // console.log(result);
    return;
  }
}

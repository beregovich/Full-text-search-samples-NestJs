import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CreateIndexUseCase } from './use-cases/create-index.useCase';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      //Авторизация для примера
      // auth: {
      //   password: appSettings.elastic.ELASTICSEARCH_PASSWORD,
      //   username: appSettings.elastic.ELASTICSEARCH_USERNAME,
      // },
    }),
  ],
  providers: [CreateIndexUseCase],
})
export class ElasticModule implements OnModuleInit {
  constructor(private readonly createIndexUseCase: CreateIndexUseCase) {}
  async onModuleInit() {
    await this.createIndexUseCase.execute();
  }
}

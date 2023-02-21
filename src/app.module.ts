import { Module } from '@nestjs/common';
import { ElasticModule } from './modules/elastic/elastic.module';

@Module({
  imports: [ElasticModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SamplePostEntity } from '../infrastructure/sample-post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindPostInPostgresUseCase {
  constructor(
    @InjectRepository(SamplePostEntity)
    private readonly postRepo: Repository<SamplePostEntity>,
  ) {}
  public async execute(searchText: string) {
    const formattedQuery = searchText.trim().replace(/ /g, ' | ');
    return this.postRepo
      .createQueryBuilder()
      .select()
      .where(`to_tsvector(content) @@ to_tsquery(:formattedQuery)`, {
        formattedQuery,
      })
      .addSelect(
        'ts_rank(to_tsvector(content), to_tsquery(:formattedQuery))',
        'rank',
      )
      .setParameter('formattedQuery', formattedQuery)
      .orderBy('rank', 'DESC')
      .getRawMany();
    //.getMany().raw;
  }
}

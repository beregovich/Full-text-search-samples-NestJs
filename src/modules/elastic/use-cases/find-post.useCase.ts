import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  QueryDslMatchQuery,
  QueryDslQueryContainer,
  SearchRequest,
} from '@elastic/elasticsearch/lib/api/types';
import { SearchQueryDto } from '../../../dto/search-query.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FindPostUseCase {
  constructor(
    private readonly elasticService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}
  async execute(term: string) {
    try {
      //Пример пагинации
      const query: SearchQueryDto = {
        searchNameTerm: term,
        pageSize: 10,
        pageNumber: 1,
      };
      const elasticResponse = await this.getSolutions(query);
      if (elasticResponse) {
        const totalHits =
          typeof elasticResponse.hits.total === 'number'
            ? elasticResponse.hits.total
            : 1;
        return {
          page: query.pageNumber,
          pageSize: query.pageSize,
          pagesCount: Math.ceil(totalHits / query.pageSize),
          totalCount: totalHits,
          items: elasticResponse,
        };
      } else return null;
    } catch (err) {
      console.log(err);
    }
  }
  private async getSolutions(clientQuery: SearchQueryDto) {
    const matchQuery: QueryDslMatchQuery = {
      query: clientQuery.searchNameTerm,
      //Нечеткий поиск
      fuzziness: 'auto',
      analyzer: 'full_text_search_analyzer',
      //коэффициент "нечеткости"
      boost: 1.5,
    };
    const searchSourceQuery: QueryDslQueryContainer = {
      match: { content: matchQuery },
    };
    const searchRequest: SearchRequest = {
      query: searchSourceQuery,
      allow_partial_search_results: true,
      size: clientQuery.pageSize,
      from: clientQuery.pageSize * (clientQuery.pageNumber - 1),
    };
    return this.elasticService.search(searchRequest);
  }
}

import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  QueryDslMatchQuery,
  QueryDslQueryContainer,
  SearchRequest,
} from '@elastic/elasticsearch/lib/api/types';
import { SearchQueryDto } from '../dto/search-query.dto';

export class FindPostUseCase {
  constructor(private readonly elasticService: ElasticsearchService) {}
  async execute(term: string) {
    //Пример пагинации
    const query: SearchQueryDto = {
      searchNameTerm: term,
      pageSize: 10,
      pageNumber: 1,
    };
    const solutions = await this.getSolutions(query);
    const totalHits =
      typeof solutions.hits.total === 'number'
        ? solutions.hits.total
        : solutions.hits.total.value;
    return {
      page: query.pageNumber,
      pageSize: query.pageSize,
      pagesCount: Math.ceil(totalHits / query.pageSize),
      totalCount: totalHits,
      items: solutions,
    };
  }
  private async getSolutions(clientQuery: SearchQueryDto) {
    try {
      const index = 'sample_index';
      const matchQuery: QueryDslMatchQuery = {
        query: clientQuery.searchNameTerm,
        //Нечеткий поиск
        fuzziness: 'auto',
        analyzer: 'full_text_search_analyzer',
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
    } catch (err) {
      console.log(JSON.stringify(err), 'getSolutions');
    }
  }
}

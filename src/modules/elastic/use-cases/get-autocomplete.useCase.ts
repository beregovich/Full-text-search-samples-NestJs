import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  QueryDslMatchQuery,
  QueryDslQueryContainer,
  SearchRequest,
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetAutocompleteUseCase {
  constructor(
    private readonly elasticService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}
  async execute(term: string) {
    try {
      const elasticResponse = await this.getAutocomplete(term);
      if (elasticResponse) {
        return {
          items: elasticResponse,
        };
      } else return null;
    } catch (err) {
      console.log(err);
    }
  }
  private async getAutocomplete(term: string) {
    const matchQuery: QueryDslMatchQuery = {
      query: term,
      analyzer: 'autocomplete_analyzer',
    };
    const searchSourceQuery: QueryDslQueryContainer = {
      match: { 'content.autocomplete': matchQuery },
    };
    const searchRequest: SearchRequest = {
      query: searchSourceQuery,
      //allow_partial_search_results: true,
    };
    return this.elasticService.search(searchRequest);
  }
}

import { IndicesIndexSettings } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { MappingTypeMapping } from '@elastic/elasticsearch/lib/api/types';

/**
 * Индекс — аналог базы данных в привычных СУБД.
 */
export const indicesCreateSettingsRequest: IndicesIndexSettings = {
  //Максимальная разность min_gram и max_gram
  max_ngram_diff: 30,
  analysis: {
    //Фильтр
    filter: {
      autocomplete_filter: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 20,
      },
    },
    //Анализаторы
    analyzer: {
      full_text_search_analyzer: {
        type: 'standard',
      },
      ngram_analyzer: {
        type: 'custom',
        tokenizer: 'ngram_tokenizer',
        filter: ['lowercase'],
      },
      autocomplete_analyzer: {
        type: 'custom',
        tokenizer: 'standard',
        filter: ['lowercase', 'autocomplete_filter'],
      },
      autocomplete_search_analyzer: {
        type: 'custom',
        tokenizer: 'autocomplete',
        //tokenizer: 'keyword',
        filter: ['lowercase'],
      },
    },
    //Токенизаторы - описывают как будет разбиваться поток символов для ключи.
    tokenizer: {
      //Стандартный токенайзер разбивает текст на слова по Unicode Text Segmentation algorithm.
      standard: {
        type: 'standard',
        max_token_length: 15,
      },
      //ngram токенайзер разбивает текст на слова
      //Затем создает N-граммы для каждого слова.
      //Полезно когда обрабатываются длинные последовательности символов
      ngram_tokenizer: {
        type: 'ngram',
        min_gram: 3,
        max_gram: 10,
        token_chars: ['letter', 'digit'],
      },
      //edge_ngram токенайзер разбивает текст на слова
      //Затем создает N-граммы с привязкой к началу слова.
      //Рекомендуется для автозавершения
      autocomplete: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 30,
        token_chars: ['letter', 'digit', 'whitespace'],
      },
    },
  },
};
/**
 * Маппинг — аналог таблицы/схемы в привычных СУБД
 * описывается структура документа с указанием применяемых анализаторов.
 * Вообще говоря, после создания индекса изменить мапинг нельзя —
 * при такой необходимости создается новый индекс куда перебрасываются данные.
 */
export const samplePostMapping: MappingTypeMapping = {
  properties: {
    date: { type: 'date' },
    content: {
      type: 'text',
      //Используется при поиске
      search_analyzer: 'full_text_search_analyzer',
      //search_analyzer: 'ngram_analyzer',
      //Используется при индексации
      analyzer: 'ngram_analyzer',
      fields: {
        complete: {
          type: 'text',
          analyzer: 'autocomplete_analyzer',
          search_analyzer: 'standard',
        },
      },
    },
  },
};

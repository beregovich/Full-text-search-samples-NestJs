import { Injectable } from '@nestjs/common';

@Injectable()
export class FindPostInPostgresUseCase {
  constructor() {}
  public async execute(searchText: string) {
    return null;
  }
}

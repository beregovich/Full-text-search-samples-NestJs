import { CreatePostDto } from '../../../dto/create-post.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InsertPostInPostgresUseCase {
  constructor() {}
  public async execute(post: CreatePostDto) {
    return null;
  }
}

import { CreatePostDto } from '../../../dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SamplePostEntity } from '../infrastructure/sample-post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InsertPostInPostgresUseCase {
  constructor(
    @InjectRepository(SamplePostEntity)
    private readonly postRepo: Repository<SamplePostEntity>,
  ) {}
  public async execute(post: CreatePostDto) {
    return this.postRepo.save({
      date: new Date(),
      content: post.content,
    });
  }
}

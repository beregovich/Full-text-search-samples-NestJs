import { PostDocument, SamplePost } from '../infrastructure/sample-post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from '../../../dto/create-post.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InsertPostInMongoUseCase {
  constructor(
    @InjectModel(SamplePost.name)
    private readonly postModel: Model<PostDocument>,
  ) {}
  public async execute(post: CreatePostDto) {
    return this.postModel.create({
      date: new Date(),
      content: post.content,
    });
  }
}

import { PostDocument, SamplePost } from '../infrastructure/sample-post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindPostInMongoUseCase {
  constructor(
    @InjectModel(SamplePost.name)
    private readonly postModel: Model<PostDocument>,
  ) {}
  public async execute(searchText: string) {
    return this.postModel.aggregate([
      {
        $match: { $text: { $search: searchText } },
      },
    ]);
    // find({
    //
    //   $text: { $search: searchText },
    // });
  }
}

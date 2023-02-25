import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SamplePost {
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  content: string;
}
export const SamplePostSchema = SchemaFactory.createForClass(SamplePost).index(
  {
    content: 'text',
  },
  {
    weights: {
      content: 7,
    },
  },
);
export type PostDocument = HydratedDocument<SamplePost>;

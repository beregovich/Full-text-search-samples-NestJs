import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class SamplePost {
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  content: string;
}
export const SamplePostSchema = SchemaFactory.createForClass(SamplePost).index({
  content: 'text',
});

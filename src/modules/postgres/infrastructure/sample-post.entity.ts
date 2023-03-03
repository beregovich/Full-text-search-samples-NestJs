import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SamplePostEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  @Column()
  date: Date;
  @Index({ fulltext: true })
  @Column()
  content: string;
}

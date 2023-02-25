import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SamplePostEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  @Column()
  date: Date;
  @Column()
  content: string;
}

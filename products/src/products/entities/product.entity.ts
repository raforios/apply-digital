import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column()
  description: string;

  @Column('numeric')
  price: number;

  @Column('int')
  stock: number;

  @Column('text')
  brand: string;

  @Column('boolean', { default: true })
  available: boolean;
}

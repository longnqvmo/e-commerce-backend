import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';

@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;
}

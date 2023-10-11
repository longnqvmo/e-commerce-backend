import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Category } from 'src/modules/category/model/category.model';
import { ProductImage } from 'src/modules/product-image/model/product-image.model';

@Entity({ name: 'products' })
export class Product extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'price',
    nullable: false,
  })
  price: number;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'product-category',
  })
  categories: Category[];
}

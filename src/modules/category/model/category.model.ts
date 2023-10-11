import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { ProductCategory } from 'src/modules/product-category/model/product-category.model';

@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  productCategories: ProductCategory[];
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Product } from 'src/modules/product/model/product.model';
import { Category } from 'src/modules/category/model/category.model';

@Entity({ name: 'product-category' })
export class ProductCategory extends AbstractEntity {
  @Column({
    name: 'product_id',
    nullable: false,
  })
  productId: string;

  @Column({
    name: 'category_id',
    nullable: false,
  })
  categoryId: string;

  @ManyToOne(() => Product, (product) => product.productCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(() => Category, (category) => category.productCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;
}

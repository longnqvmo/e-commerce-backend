import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Product } from 'src/modules/product/model/product.model';

@Entity({ name: 'product_images' })
export class ProductImage extends AbstractEntity {
  @Column({
    name: 'product_id',
    nullable: false,
  })
  productId: string;

  @Column({
    name: 'image',
    nullable: false,
  })
  image: string;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}

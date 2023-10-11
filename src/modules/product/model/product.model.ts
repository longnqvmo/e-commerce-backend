import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { ProductImage } from 'src/modules/product-image/model/product-image.model';
import { Favorite } from 'src/modules/favorite/model/favorite.model';
import { ProductCategory } from 'src/modules/product-category/model/product-category.model';
import { Rate } from 'src/modules/rate/model/rate.model';
import { ProductCart } from 'src/modules/product-cart/model/product-cart.model';
import { Comment } from 'src/modules/comment/model/comment.model';

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

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  productCategories: ProductCategory[];

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];

  @OneToMany(() => ProductCart, (productCart) => productCart.product)
  productCarts: ProductCart[];

  @OneToMany(() => Rate, (rate) => rate.product)
  rates: Rate[];

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];
}

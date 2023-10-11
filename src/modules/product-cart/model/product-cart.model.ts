import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Product } from 'src/modules/product/model/product.model';
import { Cart } from 'src/modules/cart/model/cart.model';

@Entity({ name: 'product-cart' })
export class ProductCart extends AbstractEntity {
  @Column({
    name: 'cart_id',
    nullable: false,
  })
  cartId: string;

  @Column({
    name: 'product_id',
    nullable: false,
  })
  productId: string;

  @Column({
    name: 'amount',
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'total_price',
    nullable: false,
  })
  totalPrice: number;

  @ManyToOne(() => Cart, (cart) => cart.productCarts)
  @JoinColumn({
    name: 'user_id',
  })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.productCarts)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}

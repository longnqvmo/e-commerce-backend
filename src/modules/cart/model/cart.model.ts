import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { User } from 'src/modules/user/model/user.model';
import { ProductCart } from 'src/modules/product-cart/model/product-cart.model';
import { Order } from 'src/modules/order/model/order.model';

@Entity({ name: 'carts' })
export class Cart extends AbstractEntity {
  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(() => ProductCart, (productCart) => productCart.cart)
  productCarts: ProductCart[];

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;
}

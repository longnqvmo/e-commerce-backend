import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Cart } from 'src/modules/cart/model/cart.model';
import { User } from 'src/modules/user/model/user.model';
import { Payment } from 'src/modules/payment/model/payment.model';

@Entity({ name: 'orders' })
export class Order extends AbstractEntity {
  @Column({
    name: 'cart_id',
    nullable: false,
  })
  cartId: string;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'total_price',
    nullable: false,
  })
  totalPrice: number;

  @OneToOne(() => Cart, (cart) => cart.order)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: Cart;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;
}

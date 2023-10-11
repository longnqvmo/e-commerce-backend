import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Token } from 'src/modules/token/model/token.model';
import { Favorite } from 'src/modules/favorite/model/favorite.model';
import { Rate } from 'src/modules/rate/model/rate.model';
import { Cart } from 'src/modules/cart/model/cart.model';
import { Order } from 'src/modules/order/model/order.model';
import { Comment } from 'src/modules/comment/model/comment.model';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    name: 'email',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role',
    default: 'customer',
    nullable: false,
  })
  role: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

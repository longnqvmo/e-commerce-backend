import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { User } from 'src/modules/user/model/user.model';
import { Product } from 'src/modules/product/model/product.model';

@Entity({ name: 'favorites' })
export class Favorite extends AbstractEntity {
  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'product_id',
    nullable: false,
  })
  productId: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.favorites)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { User } from 'src/modules/user/model/user.model';
import { Product } from 'src/modules/product/model/product.model';

@Entity({ name: 'rates' })
export class Rate extends AbstractEntity {
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

  @Column({
    name: 'rate',
    nullable: false,
  })
  rate: number;

  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.rates)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}

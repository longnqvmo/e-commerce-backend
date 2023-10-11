import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Order } from 'src/modules/order/model/order.model';

@Entity({ name: 'payments' })
export class Payment extends AbstractEntity {
  @Column({
    name: 'order_id',
    nullable: false,
  })
  orderId: string;

  @Column({
    name: 'order_status',
    nullable: false,
  })
  orderStatus: boolean;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}

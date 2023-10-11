import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { User } from 'src/modules/user/model/user.model';

@Entity({ name: 'tokens' })
export class Token extends AbstractEntity {
  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'token',
    nullable: false,
  })
  token: string;

  @Column({
    name: 'expried_at',
    type: 'timestamp',
    nullable: false,
  })
  expriedAt: Date;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}

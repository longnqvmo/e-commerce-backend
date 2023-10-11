import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Token } from 'src/modules/token/model/token.model';

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
}

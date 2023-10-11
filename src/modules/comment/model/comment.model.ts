import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { User } from 'src/modules/user/model/user.model';
import { Product } from 'src/modules/product/model/product.model';

@Entity({ name: 'comments' })
export class Comment extends AbstractEntity {
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
    name: 'parent_id',
    nullable: true,
  })
  parentId: string;

  @Column({
    name: 'comment',
    nullable: false,
  })
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.comments)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(() => Comment, (comment) => comment.childComments)
  @JoinColumn({
    name: 'parent_id',
  })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];
}

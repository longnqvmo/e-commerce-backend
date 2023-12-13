import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Product } from 'src/modules/product/model/product.model';
import { VersionAttributeOption } from 'src/modules/version-attribute-option/model/version-attribute-option.model';
import { VersionImage } from 'src/modules/image/model/version_image.model';

@Entity({ name: 'versions' })
export class Version extends AbstractEntity {
  @Column({
    name: 'product_id',
    nullable: false,
  })
  productId: string;

  @Column({
    name: 'version',
    nullable: false,
  })
  version: string;

  @Column({
    name: 'description',
    nullable: false,
  })
  description: string;

  @OneToMany(() => VersionImage, (image) => image.version)
  images: VersionImage[];

  @ManyToOne(() => Product, (product) => product.versions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @OneToMany(
    () => VersionAttributeOption,
    (versionAttributeOption) => versionAttributeOption.version,
  )
  versionAttributeOptions: VersionAttributeOption[];
}

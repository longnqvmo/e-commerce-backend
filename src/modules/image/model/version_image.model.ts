import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Version } from 'src/modules/version/model/version.model';

@Entity({ name: 'version_images' })
export class VersionImage extends AbstractEntity {
  @Column({
    name: 'version_id',
    nullable: false,
  })
  productId: string;

  @Column({
    name: 'image',
    nullable: false,
  })
  image: string;

  @ManyToOne(() => Version, (version) => version.images)
  @JoinColumn({
    name: 'version_id',
  })
  version: Version;
}

import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Option } from 'src/modules/option/model/option.model';
import { VersionAttributeOption } from 'src/modules/version-attribute-option/model/version-attribute-option.model';

@Entity({ name: 'attributes' })
export class Attribute extends AbstractEntity {
  @Column({
    name: 'attribute',
    nullable: false,
  })
  attribute: string;

  @OneToMany(() => Option, (option) => option.attribute)
  options: Option[];

  @OneToMany(
    () => VersionAttributeOption,
    (versionAttributeOption) => versionAttributeOption.attribute,
  )
  versionAttributeOptions: VersionAttributeOption[];
}

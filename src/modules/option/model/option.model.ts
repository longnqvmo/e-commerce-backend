import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Attribute } from 'src/modules/attribute/model/attribute.model';
import { VersionAttributeOption } from 'src/modules/version-attribute-option/model/version-attribute-option.model';

@Entity({ name: 'options' })
export class Option extends AbstractEntity {
  @Column({
    name: 'attribute_id',
    nullable: false,
  })
  attributeId: string;

  @Column({
    name: 'option',
    nullable: false,
  })
  option: string;

  @ManyToOne(() => Attribute, (attribute) => attribute.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'attribute_id',
  })
  attribute: Attribute;

  @OneToMany(
    () => VersionAttributeOption,
    (versionAttributeOption) => versionAttributeOption.option,
  )
  versionAttributeOptions: VersionAttributeOption[];
}

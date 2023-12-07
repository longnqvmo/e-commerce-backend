import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from 'src/modules/attribute/model/attribute.model';
import { Option } from 'src/modules/option/model/option.model';
import { Version } from 'src/modules/version/model/version.model';

@Entity({ name: 'version-attribute-option' })
export class VersionAttributeOption extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'version_id',
    nullable: false,
  })
  versionId: string;

  @Column({
    name: 'attribute_id',
    nullable: false,
  })
  attributeId: string;

  @Column({
    name: 'option_id',
    nullable: false,
  })
  optionId: string;

  @ManyToOne(() => Version, (version) => version.versionAttributeOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'version_id',
  })
  version: Attribute;

  @ManyToOne(
    () => Attribute,
    (attribute) => attribute.versionAttributeOptions,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'attribute_id',
  })
  attribute: Attribute;

  @ManyToOne(() => Option, (option) => option.versionAttributeOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'option_id',
  })
  option: Option;
}

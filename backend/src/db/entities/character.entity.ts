import { CharAttributes } from '#common/types/char-attributes.types.js'
import { db } from '#db/db.consts.js'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './auth.user.entity.js'
import { CharacterImg } from './character_img.entity.js'

const tableName = db.characters.tableName

@Entity({ name: tableName })
export class Character {
  @PrimaryGeneratedColumn('uuid', {
    name: 'char_id',
    primaryKeyConstraintName: `pkey_${tableName}_char_id`,
  })
  charId: string

  @Index(`idx_${tableName}_author_id`)
  @Column({ type: 'uuid', name: 'author_id' })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: `fk_${tableName}_author_id`,
  })
  authorId: string

  @Index(`idx_${tableName}_char_name`)
  @Column({ type: 'varchar', length: 255, name: 'char_name' })
  charName: string

  @Index(`idx_${tableName}_char_name_slug`)
  @Column({ type: 'varchar', length: 255, name: 'char_name_slug' })
  charNameSlug: string

  @Column({
    type: 'uuid',
    name: 'profile_image_id',
    nullable: true,
  })
  @ManyToOne(() => CharacterImg, (image) => image.imageId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'profile_image_id',
    referencedColumnName: 'imageId',
    foreignKeyConstraintName: `fk_${tableName}_profile_image_id`,
  })
  profileImageId: string

  @Index(`idx_${tableName}_also_known_as`)
  @Column({ type: 'varchar', length: 255, array: true, name: 'also_known_as' })
  alsoKnownAs: string[]

  @Column({
    name: 'char_type',
    type: 'enum',
    enum: db.CharType,
    enumName: 'enum_char_type',
  })
  charType: db.CharType

  @Column({ type: 'text' })
  summary: string

  @Column({ type: 'text' })
  history: string

  @Column({ type: 'text' })
  appearance: string

  @Column({ type: 'jsonb' })
  attributes: CharAttributes

  @Column({ type: 'varchar', array: true })
  strengths: string[]

  @Column({ type: 'varchar', array: true })
  weaknesses: string[]

  @Index(`idx_${tableName}_is_active`)
  @Column({ type: 'boolean', default: false, name: 'is_active' })
  isActive: boolean

  @Index(`idx_${tableName}_created_at`)
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @Index(`idx_${tableName}_updated_at`)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date

  @Index(`idx_${tableName}_deleted_at`)
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date

  @OneToMany(() => CharacterImg, (image) => image.characterId)
  images: CharacterImg[]
}

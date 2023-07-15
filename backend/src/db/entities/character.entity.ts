import { db } from '#db/db.consts.js'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

const tableName = db.characters.tableName

@Entity({ name: tableName })
export class Character {
  @PrimaryGeneratedColumn('uuid', {
    name: 'char_id',
    primaryKeyConstraintName: `pkey_${tableName}_char_id`,
  })
  charId: string

  @Index(`idx_${tableName}_char_name`)
  @Column({ type: 'varchar', length: 255, name: 'char_name' })
  charName: string

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

  @Index(`idx_${tableName}_is_active`)
  @Column({ type: 'boolean', default: false, name: 'is_active' })
  isActive: boolean

  @Index(`idx_${tableName}_created_at`)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Index(`idx_${tableName}_updated_at`)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Index(`idx_${tableName}_deleted_at`)
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

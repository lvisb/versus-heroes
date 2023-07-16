import { db } from '#db/db.consts.js'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

const tableName = db.charactersImg.tableName

@Entity({ name: tableName })
export class CharacterImg {
  @PrimaryGeneratedColumn('uuid', {
    name: 'image_id',
    primaryKeyConstraintName: `pkey_${tableName}_image_id`,
  })
  imageId: string

  @Index(`idx_${tableName}_char_name_slug`, { unique: true })
  @Column({ type: 'varchar', length: 255, name: 'char_name_slug' })
  charNameSlug: string

  @Column({ type: 'varchar', length: 255, name: 'image_path' })
  imagePath: string

  @Index(`idx_${tableName}_created_at`)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Index(`idx_${tableName}_deleted_at`)
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

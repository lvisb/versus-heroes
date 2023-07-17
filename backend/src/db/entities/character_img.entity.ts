import { db } from '#db/db.consts.js'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Character } from './character.entity.js'

const tableName = db.charactersImg.tableName

@Entity({ name: tableName })
export class CharacterImg {
  @PrimaryGeneratedColumn('uuid', {
    name: 'image_id',
    primaryKeyConstraintName: `pkey_${tableName}_image_id`,
  })
  imageId: string

  @Index(`idx_${tableName}_character_id`)
  @Column({ type: 'uuid', name: 'character_id' })
  @ManyToOne(() => Character, (char) => char.charId)
  @JoinColumn({
    name: 'character_id',
    referencedColumnName: 'charId',
    foreignKeyConstraintName: `fk_${tableName}_character_id`,
  })
  characterId: string

  @Column({ type: 'varchar', length: 255, name: 'image_path' })
  imagePath: string

  @Index(`idx_${tableName}_created_at`)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Index(`idx_${tableName}_deleted_at`)
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}

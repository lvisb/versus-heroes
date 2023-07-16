import { db } from '#db/db.consts.js'
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

const tableName = db.auth.users.tableName

@Entity({ name: tableName, synchronize: false, schema: 'auth' })
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: `pkey_${tableName}_id`,
  })
  id: string

  @Index(`idx_${tableName}_email`)
  @Column({ type: 'varchar', length: 255, name: 'email' })
  email: string

  @Column({ type: 'jsonb' })
  rawUserMetaData: any
}

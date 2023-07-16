import { Inject, Injectable } from '@nestjs/common'
import { Db } from './db.provider.js'
import { DataSource } from 'typeorm'
import { Character } from './entities/character.entity.js'
import { CharacterImg } from './entities/character_img.entity.js'

@Injectable()
export class DbService {
  constructor(@Inject(Db) private readonly _db: DataSource) {}

  get db(): DataSource {
    return this._db
  }

  get charRepo() {
    return this.db.getRepository(Character)
  }

  get charImageRepo() {
    return this.db.getRepository(CharacterImg)
  }
}

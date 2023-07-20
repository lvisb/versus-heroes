import { DbService } from '#db/db.service.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WebsiteService {
  constructor(private readonly dbService: DbService) {}

  chars() {
    return this.dbService.charRepo
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.profileImageId', 'profileImage')
      .where({
        isActive: true,
      })
      .orderBy('c.createdAt', 'DESC')
  }
}

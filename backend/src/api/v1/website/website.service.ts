import { DbService } from '#db/db.service.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WebsiteService {
  constructor(private readonly dbService: DbService) {}

  findCharByUrlSlug(slug: string) {
    return this.dbService.charRepo
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.profileImageId', 'profileImage')
      .innerJoinAndSelect('c.images', 'images')
      .where({
        charNameSlug: slug,
        isActive: true,
      })
  }

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

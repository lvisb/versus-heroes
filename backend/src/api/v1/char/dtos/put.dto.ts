import { FilterXSS } from '#common/transformers/filter-xss.transformer.js'
import { ValidationMessages } from '#common/types/validation-messages.types.js'
import { db } from '#db/db.consts.js'
import { Expose, Transform, Type } from 'class-transformer'
import {
  ArrayMaxSize,
  IsBoolean,
  IsDefined,
  IsEmpty,
  IsIn,
  IsInt,
  IsNotIn,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator'
import slug from 'slug'
import { AttributesDto } from './attributes.dto.js'

export class CharPutDto {
  @Expose()
  @IsDefined()
  @MaxLength(255, { message: 'Name is too long' })
  @FilterXSS()
  charName: string

  @Expose()
  @Transform(({ value }) => `${slug(value.replace(/[^A-Za-z0-9\-]/gi, ''))}`)
  @FilterXSS()
  charNameSlug: string

  @Expose()
  @IsNotIn([Object.values(db.CharType)], { message: 'Invalid character type' })
  @FilterXSS()
  charType: string

  @Expose()
  @ArrayMaxSize(5, { message: 'Too many aliases' })
  alsoKnownAs: string[]

  @Expose()
  @MaxLength(10000, { message: 'History is too long' })
  @FilterXSS()
  history: string

  @Expose()
  @MaxLength(1000, { message: 'Summary is too long' })
  @FilterXSS()
  summary: string

  @Expose()
  @ArrayMaxSize(5, { message: 'Too many strengths' })
  strengths: string[]

  @Expose()
  @ArrayMaxSize(5, { message: 'Too many weaknesses' })
  weaknesses: string[]

  @Expose()
  @IsDefined({ message: ValidationMessages.REQUIRED_FIELD })
  @IsUUID('4', { message: ValidationMessages.INVALID_FIELD })
  profileImageId: string

  @Expose()
  @Type(() => AttributesDto)
  @ValidateNested()
  attributes: AttributesDto

  @Expose()
  @Type(() => Boolean)
  @IsBoolean({ message: ValidationMessages.INVALID_FIELD })
  isActive: boolean
}

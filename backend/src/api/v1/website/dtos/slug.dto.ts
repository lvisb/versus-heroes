import { FilterXSS } from '#common/transformers/filter-xss.transformer.js'
import { ValidationMessages } from '#common/types/validation-messages.types.js'
import { Expose } from 'class-transformer'
import { IsDefined, IsNotEmpty } from 'class-validator'

export class SlugDto {
  @Expose()
  @IsDefined({ message: ValidationMessages.REQUIRED_FIELD })
  @FilterXSS()
  slug: string
}

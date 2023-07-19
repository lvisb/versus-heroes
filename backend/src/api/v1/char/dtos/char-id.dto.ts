import { ValidationMessages } from '#common/types/validation-messages.types.js'
import { Expose } from 'class-transformer'
import { IsDefined, IsUUID } from 'class-validator'

export class CharIdDto {
  @Expose()
  @IsDefined({ message: ValidationMessages.REQUIRED_FIELD })
  @IsUUID('4', { message: ValidationMessages.INVALID_FIELD })
  id: string
}

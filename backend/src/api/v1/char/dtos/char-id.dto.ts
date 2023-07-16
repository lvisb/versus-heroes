import { ValidationMessages } from '#common/types/validation-messages.types.js'
import { IsDefined, IsUUID } from 'class-validator'

export class CharIdDto {
  @IsDefined({ message: ValidationMessages.REQUIRED_FIELD })
  @IsUUID('4', { message: ValidationMessages.INVALID_FIELD })
  id: string
}

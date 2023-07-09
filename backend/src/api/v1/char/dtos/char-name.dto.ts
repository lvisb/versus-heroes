import { ValidationMessages } from '#common/types/validation-messages.types.js'
import { IsDefined, IsNotEmpty } from 'class-validator'

export class CharNameDto {
  @IsDefined({ message: ValidationMessages.REQUIRED_FIELD })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED_FIELD })
  name: string
}

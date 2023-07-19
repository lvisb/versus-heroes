import { ValidationMessages } from '#common/types/validation-messages.types.js'
import { Expose } from 'class-transformer'
import { IsDefined, IsNotEmpty } from 'class-validator'

export class CharNameDto {
  @Expose()
  @IsDefined({ message: ValidationMessages.REQUIRED_FIELD })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED_FIELD })
  name: string
}

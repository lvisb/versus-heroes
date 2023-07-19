import { passwordRules } from '#common/password-rules.config.js'
import { Expose } from 'class-transformer'
import {
  IsDefined,
  IsEmail,
  IsStrongPassword,
  MaxLength,
} from 'class-validator'

export class SignUpDto {
  // @IsDefined({ message: 'name is required' })
  // @MaxLength(100, { message: 'name too long' })
  // name: string

  @Expose()
  @IsDefined({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email' })
  email: string

  @Expose()
  @IsDefined({ message: 'password is required' })
  @IsStrongPassword(passwordRules, {
    message: `The password must contain at least 8 characters.`,
  })
  @MaxLength(255, { message: 'password too long, max: 255 chars' })
  password: string
}

import { passwordRules } from '#common/password-rules.config.js'
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

  @IsDefined({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email' })
  email: string

  @IsDefined({ message: 'password is required' })
  @IsStrongPassword(passwordRules, { message: 'invalid password' })
  @MaxLength(255, { message: 'password too long, max: 255 chars' })
  password: string
}

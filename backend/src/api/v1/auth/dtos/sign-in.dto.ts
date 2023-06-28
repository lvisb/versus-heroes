import { passwordRules } from '#common/config/password-rules.config.js'
import { IsDefined, IsEmail, IsStrongPassword } from 'class-validator'

export class SignInDto {
  @IsDefined()
  @IsEmail({}, { message: 'invalid email' })
  email: string

  @IsDefined()
  @IsStrongPassword(passwordRules, { message: 'invalid password' })
  password: string
}

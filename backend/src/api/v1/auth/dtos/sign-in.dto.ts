import { passwordRules } from '#common/password-rules.config.js'
import { Expose } from 'class-transformer'
import { IsDefined, IsEmail, IsStrongPassword } from 'class-validator'

export class SignInDto {
  @Expose()
  @IsDefined()
  @IsEmail({}, { message: 'invalid email' })
  email: string

  @Expose()
  @IsDefined()
  @IsStrongPassword(passwordRules, { message: 'invalid password' })
  password: string
}

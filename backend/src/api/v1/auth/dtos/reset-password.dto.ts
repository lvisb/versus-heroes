import { passwordRules } from "#common/password-rules.config.js"
import { CompareProperties } from "#common/validators/compare-constraint.validator.js"
import { Expose } from "class-transformer"
import { IsDefined, IsStrongPassword, Validate } from "class-validator"

export class ResetPasswordDto {
  @Expose()
  @IsDefined()
  @IsStrongPassword(passwordRules, { message: 'invalid password' })
  password: string

  @Expose()
  @IsDefined()
  @IsStrongPassword(passwordRules, { message: 'invalid password' })
  @Validate(CompareProperties, ['password'], { message: 'passwords do not match' })
  passwordConfirmation: string
}

import { Expose } from "class-transformer";
import { IsDefined, IsEmail } from "class-validator";

export class ForgotPasswordDto {
  @Expose()
  @IsDefined({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email' })
  email: string
}

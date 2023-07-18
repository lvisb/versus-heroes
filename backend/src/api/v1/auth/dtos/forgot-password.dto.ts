import { IsDefined, IsEmail } from "class-validator";

export class ForgotPasswordDto {
  @IsDefined({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email' })
  email: string
}

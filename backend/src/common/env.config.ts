import { Expose, Type } from 'class-transformer'
import { IsDefined, IsInt, IsJWT, IsUrl, Min } from 'class-validator'

export class Env {
  @Expose()
  @IsDefined()
  NODE_ENV: 'development' | 'production'

  @Expose()
  @Type(() => Number)
  @IsInt()
  @Min(8000)
  BACKEND_PORT: number

  @Expose()
  @IsDefined()
  DATABASE_URL: string

  @Expose()
  @IsDefined()
  @IsUrl()
  SUPABASE_URL: string

  @Expose()
  @IsDefined()
  @IsJWT()
  SUPABASE_KEY: string

  @Expose()
  @IsDefined()
  SUPABASE_JWT_SECRET: string

  @Expose()
  @IsDefined()
  OPENAI_API_KEY: string

  @Expose()
  @IsDefined()
  DREAMSTUDIO_API_KEY: string
}

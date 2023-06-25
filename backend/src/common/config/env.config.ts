import { Expose, Type } from 'class-transformer'
import { IsDefined, IsInt, Min } from 'class-validator'

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
}

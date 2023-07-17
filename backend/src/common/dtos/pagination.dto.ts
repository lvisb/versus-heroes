import { Transform } from 'class-transformer'
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator'

export class PaginationDto {
  @IsOptional({})
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Must be a int' })
  @Min(1, { message: 'Must be greater than or equal to 1' })
  currentPage: number = 1

  @IsOptional({})
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Must be a int' })
  @Min(1, { message: 'Must be greater than or equal to 1' })
  itemsPerPage: number = 25
}

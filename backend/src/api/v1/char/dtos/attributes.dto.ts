import { Expose } from 'class-transformer'
import { IsInt, Max, Min } from 'class-validator'

const errorAttributeValue = 'Attribute value must be a number between 1 and 5'

export class AttributesDto {
  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  agility: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  defense: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  endurance: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  evasion: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  intelligence: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  mobility: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  speed: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  strength: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  technique: number

  @Expose()
  @IsInt({ message: errorAttributeValue })
  @Min(1, { message: errorAttributeValue })
  @Max(5, { message: errorAttributeValue })
  vitality: number
}

export type PasswordRules = {
  minLength?: number | undefined
  minLowercase?: number | undefined
  minUppercase?: number | undefined
  minNumbers?: number | undefined
  minSymbols?: number | undefined
  returnScore?: boolean | undefined
  pointsPerUnique?: number | undefined
  pointsPerRepeat?: number | undefined
  pointsForContainingLower?: number | undefined
  pointsForContainingUpper?: number | undefined
  pointsForContainingNumber?: number | undefined
  pointsForContainingSymbol?: number | undefined
} & { returnScore: false | undefined }

export const passwordRules: PasswordRules = {
  minLength: 8,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
  returnScore: false,
}

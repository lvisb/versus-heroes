import { FormControlLabel, Rating } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useFormField } from '../../hooks/use-form-field.hook'
import { FormElement } from '../../types/form-element.type'

export const Stars = ({fieldName, i18nPath}: FormElement) => {
  const { label, formContext } = useFormField({ fieldName, i18nPath })

  const { control, getValues } = formContext

  const [value, setValue] = useState<number | null>(
    +getValues(fieldName) || null,
  )

  return (
    <FormControlLabel
      label={label}
      labelPlacement="start"
      control={
        <Controller
          name={fieldName}
          render={({ field }) => (
            <Rating
              {...field}
              sx={{ marginLeft: 1 }}
              value={value}
              onChange={(_, newValue) => {
                field.onChange(newValue)

                setValue(newValue)
              }}
            />
          )}
          control={control}
        />
      }
      sx={{ marginLeft: 0 }}
    />
  )
}

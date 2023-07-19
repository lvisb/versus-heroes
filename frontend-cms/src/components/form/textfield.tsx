import { TextField as MuiTextField } from "@mui/material";
import { useFormField } from "../../hooks/use-form-field.hook";
import { FormElement } from "../../types/form-element.type";

export const TextField = ({ fieldName, i18nPath, helperText }: FormElement) => {
  const { formContext, label, hasError, errorMessage } = useFormField({
    fieldName,
    i18nPath,
  });

  const { register } = formContext;

  return (
    <MuiTextField
      {...register(fieldName, {
        required: errorMessage,
      })}
      error={hasError}
      helperText={errorMessage || helperText}
      margin="normal"
      fullWidth
      InputLabelProps={{ shrink: true }}
      type="text"
      label={label}
      name={fieldName}
    />
  );
};

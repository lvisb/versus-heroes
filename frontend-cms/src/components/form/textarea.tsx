import { TextField } from "@mui/material";
import { useFormField } from "../../hooks/use-form-field.hook";
import { FormElement } from "../../types/form-element.type";

interface TextAreaProps extends FormElement {
  rows?: number;
}

export const TextArea = ({ fieldName, i18nPath, rows = 4 }: TextAreaProps) => {
  const { label, formContext } = useFormField({ fieldName, i18nPath });

  return (
    <TextField
      id={fieldName}
      label={label}
      multiline
      rows={rows}
      variant="outlined"
      fullWidth={true}
      InputLabelProps={{
        shrink: true,
      }}
      {...formContext.register(fieldName)}
    />
  );
};

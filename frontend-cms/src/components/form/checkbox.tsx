import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormField } from "../../hooks/use-form-field.hook";
import { FormElement } from "../../types/form-element.type";

export const Checkbox = ({ fieldName, i18nPath }: FormElement) => {
  const { formContext, label } = useFormField({ fieldName, i18nPath });

  const { control } = formContext;

  return (
    <Controller
      control={control}
      name={fieldName}
      // eslint-disable-next-line
      defaultValue={false}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <MuiCheckbox
              {...field}
              checked={field.value}
              onChange={(event) => {
                field.onChange(event.target.checked);
              }}
            />
          }
        />
      )}
    />
  );
};

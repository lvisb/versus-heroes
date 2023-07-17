import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { SyntheticEvent, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useFormField } from "../../hooks/use-form-field.hook";
import { FormElement } from "../../types/form-element.type";

export const Tags = ({ fieldName, i18nPath }: FormElement) => {
  const { formContext, label } = useFormField({ fieldName, i18nPath });

  const { control, getValues } = formContext;

  const [value, setValue] = useState<string[]>([]);

  const defaultValue = getValues(fieldName);

  const handleChange = (_: SyntheticEvent, newValue: string[]) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!defaultValue) return;

    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Controller
      control={control}
      name={fieldName}
      render={() => {
        return (
          <Autocomplete<string, true, false, true>
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={label} />
            )}
          />
        );
      }}
    ></Controller>
  );
};

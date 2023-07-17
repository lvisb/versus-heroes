import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormElement } from "../../types/form-element.type";
import { useFormField } from "../../hooks/use-form-field.hook";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

export const CharRole = ({ fieldName, i18nPath }: FormElement) => {
  const { formContext } = useFormField({ fieldName, i18nPath });
  const { control, getValues } = formContext;

  const [value, setValue] = useState<string | null>(null);

  const defaultValue = getValues(fieldName);
  const id = "char-role";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (!defaultValue) return;

    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <FormControl>
      <FormLabel id={id}>Role</FormLabel>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <RadioGroup
            row
            aria-labelledby={id}
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="hero" control={<Radio />} label="Hero" />
            <FormControlLabel
              value="villain"
              control={<Radio />}
              label="Villain"
            />
            <FormControlLabel value="both" control={<Radio />} label="Both" />
          </RadioGroup>
        )}
      ></Controller>
    </FormControl>
  );
};

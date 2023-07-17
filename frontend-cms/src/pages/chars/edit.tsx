import { Edit } from "@refinedev/mui";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { FormProvider } from "react-hook-form";
import { Checkbox } from "../../components/form/checkbox";
import { TextField } from "../../components/form/textfield";
import { Tags } from "../../components/form/tags";

export const CharEdit: React.FC<IResourceComponentsProps> = () => {
  const useFormMethods = useForm();

  const {
    saveButtonProps,
    refineCore: { formLoading },
  } = useFormMethods;

  return (
    <FormProvider {...useFormMethods}>
      <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <TextField fieldName="charName" i18nPath="char.fields" />

          <TextField fieldName="charNameSlug" i18nPath="char.fields" />

          <Tags fieldName="alsoKnownAs" i18nPath="char.fields" />

          <Checkbox fieldName="isActive" i18nPath="char.fields" />
        </Box>
      </Edit>
    </FormProvider>
  );
};

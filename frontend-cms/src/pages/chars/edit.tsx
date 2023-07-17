import { Edit } from "@refinedev/mui";
import { Box, Grid, useTheme } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { FormProvider } from "react-hook-form";
import { Checkbox } from "../../components/form/checkbox";
import { TextField } from "../../components/form/textfield";
import { Tags } from "../../components/form/tags";
import { CharRole } from "../../components/form/char-role";
import { TextArea } from "../../components/form/textarea";

export const CharEdit: React.FC<IResourceComponentsProps> = () => {
  const useFormMethods = useForm();
  const { spacing } = useTheme();

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
          <Grid container spacing={1} direction="row">
            <Grid item xs={12}>
              <CharRole fieldName="charType" i18nPath="char.fields" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fieldName="charName" i18nPath="char.fields" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fieldName="charNameSlug" i18nPath="char.fields" />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: spacing(1), marginBottom: spacing(2) }}>
              <Tags fieldName="alsoKnownAs" i18nPath="char.fields" />
            </Grid>

            <Grid item xs={12}>
              <TextArea fieldName="summary" i18nPath="char.fields" />
            </Grid>

            <Grid item xs={12}>
              <Checkbox fieldName="isActive" i18nPath="char.fields" />
            </Grid>
          </Grid>
        </Box>
      </Edit>
    </FormProvider>
  );
};

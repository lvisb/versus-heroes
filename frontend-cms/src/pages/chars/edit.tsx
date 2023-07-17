import { Edit } from "@refinedev/mui";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { FormProvider } from "react-hook-form";
import { Tabs } from "./form/tabs/tabs";

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
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs />
        </Box>
      </Edit>
    </FormProvider>
  );
};

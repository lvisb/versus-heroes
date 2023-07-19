import { Create, Edit } from "@refinedev/mui";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { FormProvider } from "react-hook-form";
import { Tabs } from "./form/tabs/tabs";

export const CharCreate: React.FC<IResourceComponentsProps> = () => {
  const useFormMethods = useForm({
    defaultValues: {
      charName: "",
    },
  });

  const {
    saveButtonProps,
    refineCore: { formLoading },
  } = useFormMethods;

  return (
    <FormProvider {...useFormMethods}>
      <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
        </Box>
      </Create>
    </FormProvider>
  );
};

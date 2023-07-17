import { Edit } from "@refinedev/mui";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { FormProvider } from "react-hook-form";
import { Tabs } from "./form/tabs/tabs";

export const CharEdit: React.FC<IResourceComponentsProps> = () => {
  const useFormMethods = useForm({
    defaultValues: {
      charId: '',
      charName: '',
      charNameSlug: '',
      charType: '',
      summary: '',
      history: '',
      alsoKnownAs: [],
      strengths: [],
      weaknesses: [],
      isActive: true,
      attributes: {
        speed: 0,
        agility: 0,
        defense: 0,
        evasion: 0,
        mobility: 0,
        strength: 0,
        vitality: 0,
        endurance: 0,
        technique: 0,
        intelligence: 0,
      }
    }
  });

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

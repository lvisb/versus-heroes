import { Grid, useTheme } from "@mui/material";
import { TextArea } from "../../../../components/form/textarea";

export const BioTab = () => {
  const { spacing } = useTheme();

  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={12}>
        <TextArea fieldName="history" i18nPath="char.fields" rows={20}/>
      </Grid>

    </Grid>
  );
};

import { Grid, useTheme } from "@mui/material";
import { CharRole } from "../../../../components/form/char-role";
import { Checkbox } from "../../../../components/form/checkbox";
import { Tags } from "../../../../components/form/tags";
import { TextArea } from "../../../../components/form/textarea";
import { TextField } from "../../../../components/form/textfield";

export const MainTab = () => {
  const { spacing } = useTheme();

  return (
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

      <Grid
        item
        xs={12}
        sx={{ marginTop: spacing(1), marginBottom: spacing(2) }}
      >
        <Tags fieldName="alsoKnownAs" i18nPath="char.fields" maxTags={5} />
      </Grid>

      <Grid item xs={12}>
        <TextArea fieldName="summary" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12}>
        <Checkbox fieldName="isActive" i18nPath="char.fields" />
      </Grid>
    </Grid>
  );
};

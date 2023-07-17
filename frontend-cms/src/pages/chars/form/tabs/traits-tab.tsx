import { Grid  } from "@mui/material";
import { Tags } from "../../../../components/form/tags";

export const TraitsTab = () => {
  return (
    <Grid container spacing={4} direction="row">
      <Grid item xs={12} md={6}>
        <Tags fieldName="strengths" i18nPath="char.fields" maxTags={5} />
      </Grid>

      <Grid item xs={12} md={6}>
        <Tags fieldName="weaknesses" i18nPath="char.fields" maxTags={5} />
      </Grid>
    </Grid>
  );
};

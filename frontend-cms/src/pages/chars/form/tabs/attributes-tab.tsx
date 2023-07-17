import { Grid  } from "@mui/material";
import { Stars } from "../../../../components/form/stars";

export const AttributesTab = () => {
  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.speed" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.agility" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.defense" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.evasion" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.mobility" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.strength" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.vitality" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.endurance" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.technique" i18nPath="char.fields" />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stars fieldName="attributes.intelligence" i18nPath="char.fields" />
      </Grid>
    </Grid>
  );
};

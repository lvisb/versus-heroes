import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
  useOne,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  TagField,
} from "@refinedev/mui";
import { Typography, Stack, Grid, Card, CardMedia } from "@mui/material";
import { supabase } from "../../consts";
import { Stars } from "./components/stars-view";

export const CharShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: charData, isLoading: charIsLoading } = useOne({
    resource: "char",
    id: record?.charId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Grid container spacing={2} paddingX={2}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight="bold">
            {record?.charName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 512 }}>
            <CardMedia
              component="img"
              image={`${supabase.charAssetsUrl}/${
                record?.images.find(
                  (image: any) => image.imageId === record?.profileImageId
                ).imagePath
              }`}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction="column" spacing={3}>
            <Typography variant="subtitle1">
              <strong>Role:</strong>{" "}
              {record?.charType === "both"
                ? "Hero / Villain"
                : record?.charType.toUpperCase()}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Active:</strong> {record?.isActive ? "Yes" : "No"}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Summary:</strong> {record?.summary}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                <strong>Strengths:</strong>
              </Typography>
              {record?.strengths?.map((item: any) => (
                <TagField value={item} key={item} />
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              gap={2}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                <strong>Weaknesses:</strong>
              </Typography>
              {record?.weaknesses?.map((item: any) => (
                <TagField value={item} key={item} />
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Typography variant="h5" fontWeight="bold">
            Attributes:
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Stars label="Speed" count={record?.attributes.speed} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Agility" count={record?.attributes.agility} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Defense" count={record?.attributes.defense} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Evasion" count={record?.attributes.evasion} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Mobility" count={record?.attributes.mobility} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Strength" count={record?.attributes.strength} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Vitality" count={record?.attributes.vitality} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Endurance" count={record?.attributes.endurance} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars label="Technique" count={record?.attributes.technique} />
            </Grid>

            <Grid item xs={12} md={2}>
              <Stars
                label="Intelligence"
                count={record?.attributes.intelligence}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Typography variant="h5">
            <strong>History:</strong>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">{record?.history}</Typography>
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Typography variant="h5">
            <strong>Images:</strong>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={2}>
            {record?.images.map((image: any) => (
              <Card key={image.imageId} sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  image={`${supabase.charAssetsUrl}/${image.imagePath}`}
                />
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Typography variant="body2">
            <strong>Created At:</strong> {record?.createdAt}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">
            <strong>Updated At:</strong> {record?.updatedAt}
          </Typography>
        </Grid>

        {/* <Grid item xs={12} marginTop={4}> */}
        {/*   <Typography variant="h5"> */}
        {/*     <strong>Appearance:</strong> */}
        {/*   </Typography> */}
        {/* </Grid> */}

        {/* <Grid item xs={12}> */}
        {/*   <Typography variant="body1">{record?.appearance}</Typography> */}
        {/* </Grid> */}

        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.charNameSlug")} */}
        {/* </Typography> */}
        {/* <TextField value={record?.charNameSlug} /> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.alsoKnownAs")} */}
        {/* </Typography> */}
        {/* <Stack direction="row" spacing={1}> */}
        {/*   {record?.alsoKnownAs?.map((item: any) => ( */}
        {/*     <TagField value={item} key={item} /> */}
        {/*   ))} */}
        {/* </Stack> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.charType")} */}
        {/* </Typography> */}
        {/* <TextField value={record?.charType} /> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.summary")} */}
        {/* </Typography> */}
        {/* <MarkdownField value={record?.summary} /> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.history")} */}
        {/* </Typography> */}
        {/* <MarkdownField value={record?.history} /> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.appearance")} */}
        {/* </Typography> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.weaknesses")} */}
        {/* </Typography> */}
        {/* <Stack direction="row" spacing={1}> */}
        {/*   {record?.weaknesses?.map((item: any) => ( */}
        {/*     <TagField value={item} key={item} /> */}
        {/*   ))} */}
        {/* </Stack> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.isActive")} */}
        {/* </Typography> */}
        {/* <BooleanField value={record?.isActive} /> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.createdAt")} */}
        {/* </Typography> */}
        {/* <DateField value={record?.createdAt} /> */}
        {/* <Typography variant="body1" fontWeight="bold"> */}
        {/*   {translate("char.fields.updatedAt")} */}
        {/* </Typography> */}
        {/* <DateField value={record?.updatedAt} /> */}
      </Grid>
    </Show>
  );
};

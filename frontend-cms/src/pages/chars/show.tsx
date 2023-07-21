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
import {
  Typography,
  Stack,
  Grid,
  Card,
  CardMedia,
  useTheme,
} from "@mui/material";
import { supabase } from "../../consts";
import { Stars } from "./components/stars-view";
import { format, utcToZonedTime } from "date-fns-tz";

export const CharShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const theme = useTheme();

  const record = data?.data;

  const { data: charData, isLoading: charIsLoading } = useOne({
    resource: "char",
    id: record?.charId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const createdAt = record?.createdAt
    ? utcToZonedTime(new Date(record?.createdAt), userTimezone)
    : null;
  const updatedAt = record?.updatedAt
    ? utcToZonedTime(new Date(record?.updatedAt), userTimezone)
    : null;

  return (
    <Show isLoading={isLoading}>
      <Grid container spacing={2} paddingX={2}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight="bold">
            {record?.charName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              <strong>Strengths:</strong>
            </Typography>
            {record?.strengths?.map((item: any) => (
              <TagField value={item} key={item} />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              <strong>Weaknesses:</strong>
            </Typography>
            {record?.weaknesses?.map((item: any) => (
              <TagField value={item} key={item} />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Typography variant="h5" fontWeight="bold">
            Attributes:
          </Typography>
        </Grid>

        <Grid item xs={12} md={9} xl={8}>
          <Stack
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent="space-between"
            gap={2}
            alignContent="space-between"
          >
            <Stars label="Speed" count={record?.attributes.speed} />
            <Stars label="Agility" count={record?.attributes.agility} />
            <Stars label="Defense" count={record?.attributes.defense} />
            <Stars label="Evasion" count={record?.attributes.evasion} />
            <Stars label="Mobility" count={record?.attributes.mobility} />
            <Stars label="Strength" count={record?.attributes.strength} />
            <Stars label="Endurance" count={record?.attributes.endurance} />
            <Stars label="Technique" count={record?.attributes.technique} />
            <Stars
              label="Intelligence"
              count={record?.attributes.intelligence}
            />
          </Stack>
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
          <Stack
            direction="row"
            useFlexGap
            gap={2}
            sx={{
              [theme.breakpoints.down("md")]: {
                flexWrap: "wrap",
              },
            }}
          >
            {record?.images.map((image: any) => (
              <Card
                key={image.imageId}
                sx={{
                  maxWidth: 300,
                }}
              >
                <CardMedia
                  component="img"
                  image={`${supabase.charAssetsUrl}/${image.imagePath}`}
                />
              </Card>
            ))}
          </Stack>
        </Grid>

        {createdAt && (
          <Grid item xs={12} marginTop={4}>
            <Typography variant="body2">
              <strong>Created At:</strong>{" "}
              {format(createdAt, "dd/MM/yyyy, HH:mm:ss", {
                timeZone: userTimezone,
              })}
            </Typography>
          </Grid>
        )}

        {updatedAt && (
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Updated At:</strong>{" "}
              {format(updatedAt, "dd/MM/yyyy, HH:mm:ss", {
                timeZone: userTimezone,
              })}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Show>
  );
};

import { FormControlLabel, Rating } from "@mui/material";

type Props = {
  label: string;
  count: number;
};

export const Stars = ({ label, count }: Props) => {
  return (
    <FormControlLabel
      label={label}
      labelPlacement="start"
      control={<Rating sx={{ marginLeft: 1 }} value={count} />}
      sx={{
        marginLeft: 0,
        "& .Mui-disabled": {
          opacity: 1,
        },
      }}
      disabled
    />
  );
};

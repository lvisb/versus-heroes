import { FormControlLabel, Rating } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  label: string;
  count: number;
};

export const Stars = ({ label, count }: Props) => {
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    if (count === undefined) return;
    setRatingValue(count);
  }, [count]);

  return (
    <FormControlLabel
      label={label}
      labelPlacement="start"
      control={
        <Rating
          sx={{ marginLeft: 1 }}
          value={ratingValue}
          onChange={() => {}}
        />
      }
      sx={{
        marginLeft: 0,
        "& .Mui-disabled": {
          opacity: '1 !important',
        },
      }}
      disabled
    />
  );
};

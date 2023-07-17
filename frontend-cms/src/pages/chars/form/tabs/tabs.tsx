import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import React from "react";
import { ReactNode } from "react";
import { MainTab } from "./main-tab";

export const Tabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label="character organized infos">
        <Tab value="1" label="Main" wrapped />
        <Tab value="2" label="Biography" />
        <Tab value="3" label="Attributes" />
        <Tab value="4" label="Strenghts / Weaknesses" />
        <Tab value="5" label="Images" />
      </TabList>

      <CustomTabPanel value="1">
        <MainTab />
      </CustomTabPanel>
    </TabContext>
  );
};

const CustomTabPanel = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return (
    <TabPanel
      value={value}
      sx={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {children}
    </TabPanel>
  );
};

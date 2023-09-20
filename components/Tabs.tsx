import React from 'react'
import {Box, Tab, Tabs as MuiTabs} from "@mui/material"

export type TabProps = {
  label: string
  body: () => React.ReactElement
}

export type TabsProps = {
  tabs: Array<TabProps>
}

export const Tabs: React.FC<TabsProps> = ({
  tabs
}) => {

  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        display: 'flex',
        height: 550,
        width: '100%'
      }}
    >
      <MuiTabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={`tab-label-${index}`}
            label={tab.label}
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
          />
        ))}
      </MuiTabs>
      {tabs.map((tab, index) => (
        <Box
          sx={{
            p: 1,
            width: '100%'
          }}
          key={`tab-label-${index}`}
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
        >
          {value === index && tab.body()}
        </Box>
      )) }
    </Box>
  )
}

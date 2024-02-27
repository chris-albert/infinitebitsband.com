import React from 'react'
import {Box} from "@mui/material";
import {Waves} from "../components/Waves";
import {Waveform} from "../components/Waveform";
import {GeneratedWaves} from "../components/GeneratedWaves";
import {TabProps, Tabs} from "../components/Tabs";
import {SimpleDomain} from "../components/visualizations/SimpleDomain";
import {Points} from "../components/visualizations/Points";

export type CanvasProps = {}

const canvas: React.FC<CanvasProps> = ({}) => {

  const tabs: Array<TabProps> = [
    {
      label: 'Generated Waves',
      body: () => <GeneratedWaves />
    },
    {
      label: 'Waves',
      body: () => <Waves />
    },
    {
      label: 'Waveforms',
      body: () => <Waveform
        url={'/media/3 - Come Find Me.wav'}
      />
    },
    {
      label: 'Simple Domain',
      body: () => <SimpleDomain url={'/media/3 - Come Find Me.wav'} />
    },
    {
      label: 'Points',
      body: () => <Points />
    },
  ]

  return (
    <Box>
      <Tabs tabs={tabs} />
    </Box>
  )
}

export default canvas
import React from 'react'

import dynamic from 'next/dynamic'
// import Timeline from 'wavesurfer/plugin/wavesurfer.timeline'
import {Box} from "@mui/material";

export type WavesProps = {}

export const Waves: React.FC<WavesProps> = ({}) => {

  const wavesurfer = React.useRef()

  React.useEffect(() => {
    create()

    return () => {
      if(wavesurfer.current) {
        // wavesurfer.current.destroy()
      }
    }
  }, [])

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer")).default
    const ws = WaveSurfer.create({
        height: 100,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        // barWidth: 3,
        // barRadius: 3,
        responsive: true,
        plugins: [],
        container: wavesurfer.current,
    })
    wavesurfer.current = ws
    // wavesurfer.current.load('/sound/Night Moves.wav')
  }

  return (
    <Box>
      <div ref={wavesurfer} style={{ minHeight: '120px' }} />
    </Box>
  )
}

import React from 'react'
import {Box} from "@mui/material";
import {CanvasForm, CanvasSpace, Group, Pt, Sound} from "pts";
import {PtsCanvas} from "react-pts-canvas";

const plotSine = (amplitude: number, frequency: number, color: string) => (form: CanvasForm, space: CanvasSpace): void => {
  let lastY = 0
  let lastX = 0
  for(let x = 0; x < space.size.x; x++) {
    const y = space.size.y/2 + (amplitude * (space.size.y / 2)) * Math.sin(x/frequency);
    form
      .stroke(color, 2)
      .line([new Pt(lastX, lastY), new Pt(x, y)])
    lastY = y
    lastX = x
  }
}

export type GeneratedWavesProps = {}

export const GeneratedWaves: React.FC<GeneratedWavesProps> = ({}) => {

  return (
    <Box>
      <PtsCanvas
        name='myCanvas'
        onStart={ (bound, space, form) => {
          space.setup({ bgcolor: "#fff" })
          space.playOnce()
        }}
        onAnimate={ (space, form, time, ftime) => {
          plotSine(.8, 20, '#000')(form, space)
          plotSine(.5, 10, '#f00')(form, space)
          plotSine(.7, 50, '#00f')(form, space)
        }}
      />
    </Box>
  )
}

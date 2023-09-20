import React from 'react'
import {Box} from "@mui/material";
import {CanvasForm, CanvasSpace, Pt, Sound} from "pts";
import {PtsCanvas} from "react-pts-canvas";

const overlays = 20
const rainbow = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']

export type WaveformProps = {
  url: string
}

export const Waveform: React.FC<WaveformProps> = ({
  url
}) => {

  const [waveformSamples, setWaveformSamples] = React.useState<Array<number> | undefined>(undefined)

  React.useEffect(() => {
    const audioContext = new AudioContext()
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(b => Array.from(b.getChannelData(0)))
      .then(setWaveformSamples)
  }, [])

  const render = (space: CanvasSpace, form: CanvasForm) => {
    const width = Math.floor(space.size.x)
    const height = space.size.y
    //draw waveform
    for(let x = 0; x < (width * overlays); x++) {
      const half = (height / 2)
      form.fillOnly(rainbow[(x / width) % 7])
        .point(new Pt(x % width , half + (half * waveformSamples[x])), 1)
    }
    // for(let x = 0; x < (space.size.x * overlays); x++) {
    //   const before = x == 0 ? 0 : x - 1
    //   const half = (space.size.y / 2)
    //   form.fillOnly('#000')
    //     .line([
    //         new Pt(before , half + (half * waveformSamples[before])),
    //         new Pt(x, half + (half * waveformSamples[x]))
    //     ])
    // }

    //draw 0 line
    for(let x = 0; x < width; x++) {
      form.fillOnly('#000')
        .point(new Pt(x, space.size.y / 2), 1)
    }
  }

  if(waveformSamples === undefined) {
    return (
      <Box>
        Analyzing Waveform...
      </Box>
    )
  } else {

    return (
      <Box
        // sx={{width: 500}}
      >
        <PtsCanvas
          name='myCanvas'
          onStart={(bound, space, form) => {
            space.setup({bgcolor: "#fff"})
            space.playOnce()
          }}
          onAnimate={(space, form, time, ftime) => {
            render(space, form)
          }}
        />
      </Box>
    )
  }
}

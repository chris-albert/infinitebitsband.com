import React from 'react'
import {Box, Button} from "@mui/material";
import {Group, Pt, Sound} from "pts";
import {PtsCanvas} from "react-pts-canvas";
import _ from 'lodash'

export type SimpleDomainProps = {
  url: string
}

export const SimpleDomain: React.FC<SimpleDomainProps> = ({url}) => {

  let sound: Sound | undefined = undefined;
  const bins = 512;
  const colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          sound.toggle();
        }}
      >
        Play
      </Button>
      <PtsCanvas
        name='myCanvas'
        onStart={ (bound, space, form) => {
          space.setup({ bgcolor: "#fff" })
          Sound.load(url).then( s => {
            sound = s.analyze(bins, -100, 0, .9);
          })
            .catch( e =>
              console.error(e)
            )
        }}
        onAnimate={ (space, form, time, ftime) => {
          const midLine = new Group(new Pt(0, space.size.y / 2), new Pt(space.size.x, space.size.y / 2))
          if (sound !== undefined && sound.playable && sound.playing) {
            const domain = sound.freqDomainTo(space.size)
            for(let i = 0; i < domain.length; i++) {
              if(i !== 0) {
                const point = domain[i]
                const prev = domain[i - 1]
                form
                  .stroke('#000', 2)
                  .line([prev, point.reflect2D(midLine)])
                form
                  .fillOnly("#f00")
                  .point(point, 2, "circle");
              }
            }
            // sound.freqDomainTo(space.size).forEach( (t, i) => {
            //   form
            //     .fill("#000")
            //     .point(t.reflect2D(midLine), 1, "circle");
            // })
            // sound.timeDomainTo(space.size).forEach( (t, i) => {
            //   form.fillOnly( colors[i%5] ).point( t, 1 );
              // form.fill("#09f").point(t, 3, "circle");
            // });
          }

        }}
        onResize={ (space, form, size, evt) => {

        }}
        onAction={ (space, form, type, px, py, evt) => {

        }}
      />
    </Box>
  )
}

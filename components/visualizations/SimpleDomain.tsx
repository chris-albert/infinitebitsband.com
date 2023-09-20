import React from 'react'
import {Box, Button} from "@mui/material";
import {Group, Pt, Sound} from "pts";
import {PtsCanvas} from "react-pts-canvas";

export type SimpleDomainProps = {}

export const SimpleDomain: React.FC<SimpleDomainProps> = ({}) => {

  let sound: Sound | undefined = undefined;
  const bins = 256;
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
          Sound.load( "/sound/Night Moves.wav" ).then( s => {
            sound = s.analyze(bins);
          })
            .catch( e =>
              console.error(e)
            )
        }}
        onAnimate={ (space, form, time, ftime) => {
          const midLine = new Group(new Pt(0, space.size.y / 2), new Pt(space.size.x, space.size.y / 2))
          if (sound !== undefined && sound.playable) {
            sound.freqDomainTo(space.size).forEach( (t, i) => {
              form
                .fill("#f00")
                .point(t.reflect2D(midLine), 3, "circle");
            })
            sound.timeDomainTo(space.size).forEach( (t, i) => {
              form.fillOnly( colors[i%5] ).point( t, 1 );
              // form.fill("#09f").point(t, 3, "circle");
            });
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

import React from 'react'
import {Box} from "@mui/material";
import {PtsCanvas} from "react-pts-canvas";
import {Create, Group, Line, Pt} from "pts";

export type PointsProps = {}

export const Points: React.FC<PointsProps> = ({}) => {

  let pts: Group | undefined = undefined

  return (
    <Box>
      <PtsCanvas
        name='myCanvas'
        onStart={ (bound, space, form) => {
          space.setup({ bgcolor: "#fff" })
          pts = Create.distributeRandom( space.innerBound, 100 );
          // space.playOnce()
        }}
        onAnimate={ (space, form, time, ftime) => {
          if(pts !== undefined) {
            const t = space.pointer;

            // let path = [new Pt(), space.pointer];
            let path = [new Pt(0, space.size.y / 2), new Pt(space.size.x, space.size.y / 2)];
            let perpends = pts.map( (p) => [p, Line.perpendicularFromPt( path, p )] );

            form.strokeOnly("#42e", 5).line( path );
            form.strokeOnly("#123", 1).lines( perpends );
            form.fillOnly("#123").points( pts, 2, "circle" );
          }

        }}
      />
    </Box>
  )
}

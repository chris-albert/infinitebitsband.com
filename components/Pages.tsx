import React from 'react'
import {Soundcloud} from "./Soundcloud";
import {Video} from "./Video";
import {Events} from "./Events";
import Photos from "../pages/photos";
import {Cobandments} from "./Cobandments";
import {Social} from "./Social";

export type Page = {
  name: string,
  element: () => React.ReactElement
}

export const Pages: Record<string, () => React.ReactElement> = {
  'social'     : () => (<Social />),
  'events'     : () => (<Events />),
  'audios'     : () => (<Soundcloud />),
  'videos'     : () => (<Video />),
  'photos'     : () => (<Photos />),
  'cobandments': () => (<Cobandments />)
}

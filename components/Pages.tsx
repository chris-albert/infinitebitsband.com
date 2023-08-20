import React from 'react'
import Audios from "../pages/audios";
import Videos from "../pages/videos";
import Events from "../pages/events";
import Photos from "../pages/photos";
import Cobandments from "../pages/cobandments";
import Social from "../pages/social";

export type Page = {
  name: string,
  element: () => React.ReactElement
}

export const Pages: Record<string, () => React.ReactElement> = {
  'social'     : () => (<Social />),
  'events'     : () => (<Events />),
  'audios'     : () => (<Audios />),
  'videos'     : () => (<Videos />),
  'photos'     : () => (<Photos />),
  'cobandments': () => (<Cobandments />)
}

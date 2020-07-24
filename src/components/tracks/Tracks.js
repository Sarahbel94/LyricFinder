import React, { Component } from 'react'
import { Consumer } from '../../context'
import Spinner from '../layout/Spinner'
import Track from './Track'

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { tracks_list, heading } = value
          if (tracks_list === undefined || tracks_list.length === 0) {
            return <Spinner />
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {tracks_list.map((item) => (
                    <Track track={item.track} key={item.track.track_id} />
                  ))}
                </div>
                <div className="row"></div>
              </React.Fragment>
            )
          }
        }}
      </Consumer>
    )
  }
}

export default Tracks

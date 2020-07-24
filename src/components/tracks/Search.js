import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'

export class Search extends Component {
  state = {
    trackTitle: '',
    artistName: '',
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  findTrack = (dispatch, e) => {
    e.preventDefault()
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&q_artist=${this.state.artistName}&page_size=10&page=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((response) => {
        console.log(response.data.message.body.track_list)
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: response.data.message.body.track_list,
        })
        this.setState({ trackTitle: '', artistName: '' })
      })
      .catch((error) => console.log(error))
  }
  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="from-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  ></input>
                  <br />
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter artist name..."
                    name="artistName"
                    value={this.state.artistName}
                    onChange={this.onChange}
                  ></input>
                </div>
                <br />
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get track lyrics
                </button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search

import React from 'react'

class ChannelHeader extends React.Component {
  render () {
    const { channel, people } = this.props

    var nameEl, countEl
    if (channel) {
      nameEl = <h2 className="channel-name vertical-center">{channel.name}</h2>
      countEl = channel.name[0] === '#' ? (
          <p className="channel-people-count vertical-center" onClick={this.props.onPeopleClick}>{people.size} people</p>
        ) : null
    } else {
      nameEl = null
      countEl = null
    }

    return (
      <div className="header channel-header">
        {nameEl}{countEl}
      </div>
    )
  }
}

export default ChannelHeader

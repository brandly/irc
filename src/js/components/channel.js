import React from 'react'
import { List } from 'immutable'

import ChannelStore from '../stores/channel-store'

import ChannelHeader from './channel-header'
import MessageList from './message-list'
import ComposeMessage from './compose-message'
import PeopleList from './people-list'

function getChannelState (channel) {
  return {
    messages: channel ? channel.getMessages() : List(),
    people: channel ? channel.getPeople() : List()
  }
}

class Channel extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, getChannelState(this.props.channel), {
      showPeopleList: false
    })
  }

  componentWillMount () {
    ChannelStore.addChangeListener(this._onChange.bind(this))
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ showPeopleList: false })
    this.setState(getChannelState(nextProps.channel))
  }

  _onChange () {
    this.setState(getChannelState(this.props.channel))
  }

  togglePeopleList () {
    this.setState({
      showPeopleList: !this.state.showPeopleList
    })
  }

  render () {
    const { channel } = this.props
    const { messages, people, showPeopleList } = this.state

    const peopleListEl = showPeopleList ? <PeopleList people={people} /> : null

    return (
      <div className="right-panel channel">
        <div className="above-bottom-panel">
          <ChannelHeader
            onPeopleClick={this.togglePeopleList.bind(this)}
            channel={channel}
            people={people}
          />
          <div className="below-header">
            <MessageList messages={messages} />
          </div>
          {peopleListEl}
        </div>
        <div className="absolute-bottom-panel">
          <ComposeMessage channel={channel} />
        </div>
      </div>
    )
  }
}

export default Channel

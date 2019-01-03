import React, { Component } from 'react'
import axios from 'axios'
import ToolBar from './ToolBar'
import Message from './Message'


class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.getMessages()
  }

  handleToggleSelected = (id) => {
    this.setState({
      messages: this.state.messages.map(message => message.id === id ? {...message, selected:!message.selected} : message)
    })
  }

  getMessages = () => {
    axios.get('http://localhost:8082/api/messages')
      .then((response) => {
        this.setState({
          messages: response.data
        })
      })
      .catch()
  }

  handleStar = (id) => {
    axios.patch('http://localhost:8082/api/messages', { command: 'star', messageIds: [`${id}`] })
      .then(() => {
        this.getMessages()
      })
      .catch()
  }

  handleMarkAsRead = (idsArray) => {
    const selected = this.state.messages.filter(message => message.selected).map(message => message.id)
    console.log(selected) // <-selected here
    axios.patch('http://localhost:8082/api/messages', { command: 'read', read: true, messageIds: `${idsArray}` })
      .then(() => {
        this.getMessages()
      })
      .catch()
  }

  handleBulkSelect = () => {
    
  }

  render() {
    return (
      <div>
        <ToolBar
          handleMarkAsRead={this.handleMarkAsRead}
        />
        {this.state.messages.map(message => {
          return <Message
            key={message.id}
            {...message}
            handleStar={this.handleStar}
            handleToggleSelected={this.handleToggleSelected}

          />
        })}
      </div>
    )
  }
}

export default MessageList
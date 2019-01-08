import React, { Component } from 'react'
import axios from 'axios'
import ToolBar from './ToolBar'
import Message from './Message'
import ComposeForm from './ComposeForm'

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      editingMessage: false,
      readingMessage: false,
      selected: {}
    }
  }

  componentDidMount() {
    this.getMessages()
  }

  handleToggleSelected = (id) => {
    let selected = {}
    if (this.state.selected.hasOwnProperty.id) {
      selected = Object.keys(this.state.selected).reduce((acc, ele) => {
        return ele === id ? { ...acc, [id]: !this.state.selected[id]} : { ...acc, [id]: true }
      }, {})
    }
    else {
      selected = { ...this.state.selected, [id]: !this.state.selected[id] }
    }
    this.setState({ selected })
  }

  isSelected = (id) => {
    return this.state.selected[id] || false
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
  
  getSelectedIds = () => {
    return Object.keys(this.state.selected).filter(id => this.state.selected[id] === true)
  }

  patch = (command, bodyKey = null, bodyValue = null ) => {
    const selected = this.getSelectedIds()
    axios.patch('http://localhost:8082/api/messages', { command, messageIds: selected, [bodyKey]: bodyValue })
    .then(() => {
      this.getMessages()
    })
    .catch()
  }

  handleBulkSelect = () => {
    const selected = this.getSelectedIds()

    if (selected.length === this.state.messages.length) {
      this.setState({
        selected: {}
      })
    }

    else {
      const selected = this.state.selected
      this.state.messages.forEach(message => selected[message.id] = true)
      this.setState({
        selected
      })
    }
  }

  handleMarkAsRead = () => {
    this.patch('read','read', true)
  }

  handleMarkAsUnread = () => {
    this.patch('read', 'read', false)
  }

  handleTrashMessage = () => {
    this.patch('delete')
  }

  handleApplyLabel = (label) => {
    this.patch('addLabel','label', label)
  }

  handleRemoveLabel = (label) => {
    this.patch('removeLabel', 'label', label)
  }

  countUnread = () => {
    const unreadMessages = this.state.messages.filter(message => message.read === false)
    return unreadMessages.length
  }

  countSelected = () => {
    const selected = this.getSelectedIds()
    if (selected.length === this.state.messages.length) return 'all'
    else { return selected.length }
  }

  handleOpenComposeForm = () => {
    this.setState({
      editingMessage: !this.state.editingMessage
    })
  }

  handleNewMessage = (subject, body) => {
    axios.post('http://localhost:8082/api/messages', {body, subject})
      .then( () => {
        this.setState({
          editingMessage: !this.state.editingMessage
        })
        this.getMessages()
      })
  }

  handleReadAMessage = (id) => {
    this.setState({
      messages: this.state.messages.map(message => message.id === id ? { ...message, reading: !message.reading } : message)
    })
  }

  render() {
    return (
      <div>
        <ToolBar
          handleBulkSelect={this.handleBulkSelect}
          handleMarkAsRead={this.handleMarkAsRead}
          handleMarkAsUnread={this.handleMarkAsUnread}
          handleTrashMessage={this.handleTrashMessage}
          handleApplyLabel={this.handleApplyLabel}
          handleRemoveLabel={this.handleRemoveLabel}
          countUnread={this.countUnread}
          countSelected={this.countSelected}
          handleOpenComposeForm={this.handleOpenComposeForm}
          />

        {this.state.editingMessage ? 
        <ComposeForm handleNewMessage={this.handleNewMessage}/> : null}

        {this.state.messages.map(message => {
          return <Message
            key={message.id}
            {...message}
            selectedMessage={this.isSelected(message.id)}
            handleStar={this.handleStar}
            handleToggleSelected={this.handleToggleSelected}
            handleReadAMessage={this.handleReadAMessage}
            />
        })}
      </div>
    )
  }
}

export default MessageList
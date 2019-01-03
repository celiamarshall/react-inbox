import React, { Component } from 'react';
import ToolBar from './ToolBar'
import MessageList from './MessageList'


class App extends Component {
  render() {
    return (
      <div className='container'>
        < MessageList />
      </div>
    )
  }
}

export default App;

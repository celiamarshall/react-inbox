import React, { Component } from 'react'
import Label from './Label'

//props: id, read, starred, selected, labels, subject, body

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected : !!this.props.selected
    }
  }

  handleCheck = () => {
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    return (
      <div className={`row message ${this.props.read ? 'read' : 'unread'} ${this.state.selected ? 'selected' : null}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={!!this.state.selected} onChange={this.handleCheck}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${this.props.starred ? 'fa-star' : 'fa-star-o'}`} onClick={() => this.props.handleStar(this.props.id)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.labels.map(label => {
            return < Label labelProp={label} />
          })}
          <a href="#">{this.props.subject}</a>
        </div>
      </div>
    )
  }
}

export default Message
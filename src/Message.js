import React from 'react'
import Label from './Label'

function Message(props) {
  return (
    <div>
    <div className={`row message ${props.read ? 'read' : 'unread'} ${props.selectedMessage ? 'selected' : null}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={!!props.selectedMessage} onChange={() => props.handleToggleSelected(props.id)} />
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${props.starred ? 'fa-star' : 'fa-star-o'}`} onClick={() => props.handleStar(props.id)}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={() => props.handleReadAMessage(props.id)}>
        {props.labels.map(label => < Label labelProp={label} />)}
        <a href="#">{props.subject}</a>
      </div>
    </div>

    {props.reading ?
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          {props.body}
        </div>
      </div>
      :
      null
    }
    </div>
  )
}

export default Message
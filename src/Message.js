import React, { Component } from 'react'
import Label from './Label'

//props: id, read, starred, selected, labels, subject, body

function Message(props){
    return (
      <div className={`row message ${props.read ? 'read' : 'unread'} ${props.selected ? 'selected' : null}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={!!props.selected} onChange={() => props.handleToggleSelected(props.id)}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${props.starred ? 'fa-star' : 'fa-star-o'}`} onClick={() => props.handleStar(this.props.id)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          { props.labels.map(label => < Label labelProp={label} />) }
          <a href="#">{props.subject}</a>
        </div>
      </div>
    )
}

export default Message
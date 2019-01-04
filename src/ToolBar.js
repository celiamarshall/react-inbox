import React, { Component } from 'react'

class ToolBar extends Component {

  buttonState = () => {
    if (this.props.countSelected() === 0) return 'fa-square-o'

    if (this.props.countSelected() === 'all') return 'fa-check-square-o'

    else { return 'fa-minus-square-o' }
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.countUnread()}</span>
            {this.props.countUnread() === 1 ? 'unread message' : 'unread messages'}
          </p>

          <button className="btn btn-danger" onClick={this.props.handleOpenComposeForm}>
            <i className="fa fa-plus"></i>
          </button>

          <button className="btn btn-default" onClick={this.props.handleBulkSelect}>
            <i className={`fa ${this.buttonState()}`}></i>
          </button>

          <button className="btn btn-default" onClick={this.props.handleMarkAsRead} disabled={!!(this.props.countSelected() === 0)}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.props.handleMarkAsUnread} disabled={!!(this.props.countSelected() === 0)}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(event) => this.props.handleApplyLabel(event.target.value)} defaultValue="Apply label" disabled={!!(this.props.countSelected() === 0)}>
            <option disabled>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(event) => this.props.handleRemoveLabel(event.target.value)} defaultValue="Remove label" disabled={!!(this.props.countSelected() === 0)}>
            <option disabled>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.handleTrashMessage} disabled={!!(this.props.countSelected() === 0)}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default ToolBar
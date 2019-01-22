import React from 'react'

class AmountBox extends React.Component {
  render () {
    return (
      <div className="col">
        <div className="card">
          <div className={`card-header bg-${this.props.type} text-white`}>{this.props.text}</div>
          <div className="card-body">{this.props.amount}</div>
        </div>
      </div>
    )
  }
}

export default AmountBox

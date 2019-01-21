import React, { Component } from 'react';

class Record extends Component {
  render() {

    return (
      <tr >
        <td>{this.props.record.date}</td>
        <td>{this.props.record.Title}</td>
        <td>{this.props.record.amount}</td>
      </tr>
    );
  }
}

export default Record;

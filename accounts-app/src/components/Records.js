import React, { Component } from 'react';
import Record from './Record';
class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Records: [
        {
          id: 1,
          date: '2019-01-21',
          Title: '收入',
          amount: '20'
        },
        {
          id: 2,
          date: '2019-01-22',
          Title: '收入',
          amount: '30'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h2>Records</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Records.map((record) => <Record key={record.id} record={record}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Records;

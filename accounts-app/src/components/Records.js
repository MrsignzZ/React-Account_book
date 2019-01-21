import React, { Component } from 'react';
import Record from './Record';
import { getJSON } from 'jquery';
class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      records: []
    };
  }

  componentDidMount() {
    getJSON('http://localhost:3004/records').then(
      res =>
        this.setState({
          records: res,
          isLoading: true
        }),
      error =>
        this.setState({
          isLoading: true,
          error
        })
    );
  }

  render() {
    const { error, isLoading, records } = this.state;

    if (error) {
      return <div>Error: {error.responseText}</div>;
    } else if (!isLoading) {
      return <div>Loading...</div>;
    } else {
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
              {this.state.records.map(record => (
                <Record key={record.id} {...record} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Records;

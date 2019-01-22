import React, { Component } from 'react';
import Record from './Record';
// import { getJSON } from 'jquery';
import axios from 'axios';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';
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
    // jquery 请求API
    // getJSON('http://localhost:3004/records').then(
    //   res =>
    //     this.setState({
    //       records: res,
    //       isLoading: true
    //     }),
    //   error =>
    //     this.setState({
    //       isLoading: true,
    //       error
    //     })
    // );

    // axios 请求API

    axios
      .get(`${RecordsAPI.api}/records`)
      .then(res =>
        this.setState({
          records: res.data,
          isLoading: true
        })
      )
      .catch(error =>
        this.setState({
          isLoading: true,
          error
        })
      );
  }

  addRecord(record) {
    this.setState({
      error: null,
      isLoading: true,
      records: [...this.state.records, record]
    });
  }

  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        return item;
      }
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }

  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter(
      (item, index) => index !== recordIndex
    );
    this.setState({
      records: newRecords
    });
  }

  credits() {
    let credits = this.state.records.filter(record => record.amount >= 0);
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0);
  }

  debits() {
    let credits = this.state.records.filter(record => record.amount < 0);
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0);
  }

  balance() {
    return this.credits() + this.debits()
  }

  render() {
    const { error, isLoading, records } = this.state;
    let recordsComponent;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoading) {
      recordsComponent = <div>Loading...</div>;
    } else {
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <Record
                key={record.id}
                record={record}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credits" type="success" amount={this.credits()} />
          <AmountBox text="Debits" type="danger" amount={this.debits()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div>
    );
  }
}

export default Records;

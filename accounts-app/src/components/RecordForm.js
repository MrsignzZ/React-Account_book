import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      title: '',
      amount: ''
    };
  }

  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState(((obj = {}), (obj['' + name] = event.target.value), obj));
  }

  valid() {
    return this.state.date && this.state.title && this.state.amount;
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      date: this.state.date,
      title: this.state.title,
      amount: Number.parseInt(this.state.amount, 0)
    };
    RecordsAPI.create(data)
      .then(res => {
        this.props.handleNewRecord(res.data)
        this.setState({
          data: '',
          title: '',
          amount: ''
        })
      })
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <form
        className="form-inline mb-3"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <div className="form-group mr-1">
          <input
            onChange={this.handleChange.bind(this)}
            type="text"
            className="form-control"
            placeholder="Date"
            name="date"
            value={this.state.date}
          />
        </div>
        <div className="form-group mr-1">
          <input
            onChange={this.handleChange.bind(this)}
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={this.state.title}
          />
        </div>
        <div className="form-group mr-1">
          <input
            onChange={this.handleChange.bind(this)}
            type="text"
            className="form-control"
            placeholder="Amount"
            name="amount"
            value={this.state.amount}
          />
        </div>
        <button className="btn btn-primary" disabled={!this.valid()}>
          Create Record
        </button>
      </form>
    );
  }
}

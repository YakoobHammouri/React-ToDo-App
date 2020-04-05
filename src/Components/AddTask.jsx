import React, { Component } from 'react';

class AddTask extends Component {
  state = {
    taskText: ''
  };
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.AddTask(this.state.taskText);
    this.setState({ taskText: '' });
  };

  onChangeHandler = e => {
    this.setState({ taskText: e.target.value });
  };

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmitHandler}>
          <h2>Write What you need to do</h2>
          <div className="form form-control">
            <input
              type="text"
              placeholder="Add new Taks"
              onChange={this.onChangeHandler}
              value={this.state.taskText}
              className="input-control"
            />

            <button className="btn btn-blue">
              Add<i className="fas fa-plus"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTask;

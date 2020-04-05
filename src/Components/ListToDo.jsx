import React, { Component } from 'react';

class ListToDo extends Component {
  state = {
    taskId: '',
    taskText: '',
  };

  ToDoItem = (task) => {
    const { id, text, completed } = task;
    return (
      <div className="task-container">
        <div className="task-check">
          <input
            type="checkbox"
            name={`complete${id}`}
            id={`complete${id}`}
            checked={completed}
            onChange={() => {
              this.MarkTask({ id });
            }}
          ></input>
        </div>

        <div className="task-text">
          <label className="show">{text}</label>
          <input
            type="text"
            value={this.state.taskText}
            className="input-control  hidden"
            onChange={this.onTaskTextChnage}
          ></input>
        </div>

        <div className="task-btn">
          <button
            action="edit"
            className="btn btn-blue"
            onClick={() => {
              this.EditTask({ id, text });
            }}
          >
            <i className="fas fa-pen"></i>
          </button>

          <button
            action="save"
            className="btn btn-green hidden"
            onClick={() => {
              this.SaveEdit({ id });
            }}
          >
            <i className="fas fa-save"></i>
          </button>

          <button
            className="btn btn-red"
            onClick={() => {
              this.DeleteTask({ id });
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  };

  MarkTask = (task) => {
    this.props.MarkTask(task.id);
  };

  DeleteTask = (task) => {
    this.props.DeleteTask(task.id);
  };
  EditTask = (task) => {
    this.setState({ taskId: task.id, taskText: task.text });
  };

  SaveEdit = (task) => {
    //console.log(this.state);
    // alert(this.state.taskId.toString() + this.state.taskText.toString());
    this.props.EditTask(this.state.taskId, this.state.taskText);
    this.setState({ taskId: '' });
  };

  onTaskTextChnage = (e) => {
    this.setState({ taskText: e.target.value });
  };
  render() {
    const list = this.props.items.map((item) => {
      const cssClass = item.id === this.state.taskId ? 'active-edit' : '';
      return (
        <li className={cssClass} key={item.id.toString()}>
          {' '}
          {this.ToDoItem(item)}{' '}
        </li>
      );
    });
    return (
      <section className="row">
        <div className="task-list">
          <ul>{list}</ul>
        </div>
      </section>
    );
  }
}

export default ListToDo;

import React, { Component } from 'react';

import AddTask from './Components/AddTask';

import ListToDo from './Components/ListToDo';

import './App.css';

class App extends Component {
  state = {
    items: [
      { id: 1, text: 'Test to to do 1', completed: false },
      { id: 2, text: 'Test to to do 2', completed: true },
      { id: 3, text: 'Test to to do 3', completed: false }
    ]
  };

  componentWillMount() {
    let taskList = [];
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }
      taskList.push(JSON.parse(localStorage.getItem(key)));
    }
    this.setState({ items: taskList });
  }

  AddTask = taskText => {
    // Add
    const task = createNewTodo(taskText);
    localStorage.setItem(`Task-${task.id}`, JSON.stringify(task));
    const taskList = this.state.items;
    taskList.push(task);
    this.setState({ items: taskList });
  };

  DeleteTask = taskId => {
    const taskItems = this.state.items.filter(element => element.id !== taskId);
    localStorage.removeItem(`Task-${taskId}`);
    this.setState({ items: taskItems });
  };

  MarkTask = taskId => {
    const taskItems = this.state.items;
    const taskIndex = taskItems.findIndex(element => element.id === taskId);
    taskItems[taskIndex].completed = !taskItems[taskIndex].completed;
    const taskStorage = localStorage.getItem(`Task-${taskId}`);
    if (!taskStorage) {
      // Add Task to LoaclStorge if not Found
      const task = createNewTodo(taskItems[taskIndex].text);
      task.completed = true;
      localStorage.setItem(`Task-${task.id}`, JSON.stringify(task));
    } else {
      // Task found in local Storage
      let markTask = JSON.parse(taskStorage);
      markTask.completed = taskItems[taskIndex].completed;
      localStorage.setItem(`Task-${markTask.id}`, JSON.stringify(markTask));
    }
    this.setState({ items: taskItems });
  };

  EditTask = (taskId, newText) => {
    const taskItems = this.state.items;
    const taskIndex = taskItems.findIndex(element => element.id === taskId);
    taskItems[taskIndex].text = newText;
    const taskStorage = localStorage.getItem(`Task-${taskId}`);
    if (!taskStorage) {
      // Add Task to LoaclStorge if not Found
      const task = createNewTodo(newText);
      localStorage.setItem(`Task-${task.id}`, JSON.stringify(task));
    } else {
      // Task found in local Storage
      let editTask = JSON.parse(taskStorage);
      editTask.text = taskItems[taskIndex].text;
      localStorage.setItem(`Task-${editTask.id}`, JSON.stringify(editTask));
    }
    this.setState({ items: taskItems });
  };

  render() {
    return (
      <div className="App">
        <AddTask AddTask={this.AddTask} />
        <ListToDo
          items={this.state.items}
          DeleteTask={this.DeleteTask}
          MarkTask={this.MarkTask}
          EditTask={this.EditTask}
        />
      </div>
    );
  }
}

function getTaskID() {
  return localStorage.length + 1;
}

function createNewTodo(text) {
  return {
    id: getTaskID(),
    text,
    completed: false
  };
}

export default App;

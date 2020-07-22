import React from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import FilterTab from "./FilterTab";
import "./App.css";
import shortid from "shortid";

class App extends React.Component {
  
  state = {
    todos: [],
    selectedTab: 0,
    filterTab: ["All", "Active", "Completed"]
  };

  changeSelectedTab = index => {
    this.setState({
      selectedTab: index
    });
  };

  currentTime() {
    let time = Date().toLocaleString();
    let firstWhitespaceIndex = time.indexOf(" ");
    let gmtIndex = time.indexOf("GMT");
    return time.slice(firstWhitespaceIndex + 1, gmtIndex - 1);
  }

  toggleCheckBox = newObj => {
    const todos = Array.from(this.state.todos);
    for (let todo of todos) {
      if (todo.id === newObj.id) {
        todo.completed = newObj.completed;
        break;
      }
    }
    this.setState({
      todos
    });
  };

  saveEditedText = textObj => {
    const todos = Array.from(this.state.todos);
    for (let todo of todos) {
      if (todo.id === textObj.id) {
        todo.text = textObj.text;
        break;
      }
    }
    this.setState({
      todos
    });
  };

  deleteTask = id => {
    let todos = this.state.todos.filter(todo => {
      if (todo.id !== id) return true;
      return false;
    });

    this.setState({
      todos
    });
  };

  handleTextInput = text => {
    let that = this;
    const todos = Array.from(this.state.todos);
    let todoObj = {
      text,
      completed: false,
      note: "",
      id: shortid.generate(),
      time: that.currentTime()
    };
    todos.unshift(todoObj);
    this.setState({
      todos
    });
  };

  saveNoteContent = noteObj => {
    const todos = Array.from(this.state.todos);
    for (let todo of todos) {
      if (todo.id === noteObj.id) {
        todo.note = noteObj.note;
        break;
      }
    }
    this.setState({
      todos
    });
  };

  ifTasksthere() {
    return this.state.todos.length > 0;
  }

  render() {
    return (
      <div className="App">
        <Header onEnter={this.handleTextInput} />
        <main>
          {this.ifTasksthere() && (
            <div className="filter">
              {this.state.filterTab.map((tab, index) => {
                return (
                  <FilterTab
                    selectedTab={this.state.selectedTab}
                    changeTab={this.changeSelectedTab}
                    tab={tab}
                    index={index}
                    key={tab}
                  />
                );
              })}
            </div>
          )}
          <TodoList
            callFuncs={{
              toggleCheckBox: this.toggleCheckBox,
              deleteTask: this.deleteTask,
              saveEditedText: this.saveEditedText,
              saveNoteContent: this.saveNoteContent
            }}
            selectedTabName={this.state.filterTab[this.state.selectedTab]}
            todos={this.state.todos}
          />
        </main>
      </div>
    );
  }
}

export default App;

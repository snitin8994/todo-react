import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

class TodoList extends React.Component {
  filter() {
    const { selectedTabName } = this.props;
    if (selectedTabName === "All") return this.props.todos;
    if (selectedTabName === "Completed") {
      const completedTodos = this.props.todos.filter(todo => {
        if (todo.completed === true) return true;
        return false;
      });

      return completedTodos;
    }
    if (selectedTabName === "Active") {
      const activeTodos = this.props.todos.filter(todo => {
        if (todo.completed === false) return true;
        return false;
      });

      return activeTodos;
    }
  }
  render() {
    return (
      <ul className="list-container">
        {this.filter().map(todo => (
          <TodoItem
            callFuncs={this.props.callFuncs}
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    );
  }
}
export default TodoList;

import React from "react";
import "./Header.css";

class Header extends React.Component {
  state = {
    text: ""
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = e => {
    if (e.which !== 13 || this.state.text.trim() === "") return;
    this.props.onEnter(this.state.text)
    this.setState({
        text:""
    })
  };

  render() {
    return (
      <header className="header">
        <h1 className="header__title">Todo</h1>
        <input
          onKeyPress={this.handleSubmit}
          onChange={this.handleChange}
          className="todo-input"
          value={this.state.text}
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }
}

export default Header;

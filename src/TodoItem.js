import React from "react";
import "./TodoItem.css";

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    editVal: "",
    openModal: false,
    textAreaVal: "",
    noteEditButtonClicked: false
  };

  toggleCheckBox = () => {
    let checkBoxObj = {
      id: this.props.todo.id,
      completed: !this.props.todo.completed
    };
    this.props.callFuncs.toggleCheckBox(checkBoxObj);
  };

  editInputFocus() {
    this.editNode.focus();
  }

  editInputChange = e => {
    this.setState({
      editVal: e.target.value
    });
  };

  showEditInput = () => {
    this.setState(
      {
        isEditing: true,
        editVal: this.props.todo.text
      },
      this.editInputFocus
    );
  };

  deleteTask = () => {
    const id = this.props.todo.id;
    this.props.callFuncs.deleteTask(id);
  };

  saveText = e => {
    if (e.which !== 13) return;
    if (this.state.editVal.trim() === "") {
      this.setState({
        isEditing: false
      });
      return;
    }
    const id = this.props.todo.id;
    const textObj = {
      text: this.state.editVal,
      id
    };
    this.props.callFuncs.saveEditedText(textObj);
    this.setState({
      isEditing: false
    });
  };

  openNoteModal = () => {
    this.setState(
      {
        openModal: true
      },
      this.textareaFocus
    );
  };

  textareaFocus = () => {
    if (!this.anyNoteContent() || this.state.noteEditButtonClicked) {
      this.textareaNode.focus();
    }
  };

  anyNoteContent() {
    return this.props.todo.note.length > 0;
  }

  closeModal = () => {
    this.setState({
      openModal: false
    });
  };

  handleTextareaContentChange = e => {
    this.setState({
      textAreaVal: e.target.value
    });
  };

  saveNote = () => {
    if (this.state.textAreaVal.trim() === "") return;
    this.props.callFuncs.saveNoteContent({
      id: this.props.todo.id,
      note: this.state.textAreaVal
    });
    if (this.state.noteEditButtonClicked)
      this.setState({
        noteEditButtonClicked: false
      });
  };

  noteEdit=()=> {
    this.setState(
      {
        noteEditButtonClicked: true,
        textAreaVal:this.props.todo.note
      },
      this.textareaFocus
    );
  }

  render() {
    const { text, completed, note, time } = this.props.todo;
    const todoParaClass = completed ? "taskDone list__task" : "list__task";
    return (
      <li>
        {!this.state.isEditing && (
          <div onDoubleClick={this.showEditInput}>
            <div className="list__container">
              <div onClick={this.toggleCheckBox} className="list__checkbox">
                {completed && <div className="list__tick">&#10003;</div>}
              </div>
              <p className={todoParaClass}>{text}</p>
              <div className="note" onClick={this.openNoteModal}>
                +
              </div>
              <div onClick={this.deleteTask} className="list__deleteButton">
                &#9747;
              </div>
            </div>
            <div className="list__createTime">created: {time}</div>
          </div>
        )}
        {this.state.isEditing && (
          <div className="list">
            <input
              ref={node => (this.editNode = node)}
              onKeyDown={this.saveText}
              onChange={this.editInputChange}
              value={this.state.editVal}
              className="list__edit"
              type="text"
            />
          </div>
        )}
        {this.state.openModal && (
          <div className="overlay">
            <div className="modal">
              <div className="closeButton-container">
                <div className="empty-box" />
                <div onClick={this.closeModal} className="modal__closebutton">
                  &#9747;
                </div>
              </div>
              {(!this.anyNoteContent() || this.state.noteEditButtonClicked) && (
                <div>
                  <textarea
                    ref={node => (this.textareaNode = node)}
                    onChange={this.handleTextareaContentChange}
                    value={this.state.textAreaVal}
                    className="modal__textarea"
                  />
                  <button onClick={this.saveNote} className="modal__button">
                    SAVE
                  </button>
                </div>
              )}
              {this.anyNoteContent() && !this.state.noteEditButtonClicked && (
                <div>
                  <p className="modal__text">{note}</p>
                  <button onClick={this.noteEdit} className="modal__button">
                    EDIT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default TodoItem;

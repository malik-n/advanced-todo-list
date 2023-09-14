import { useState } from "react";
import { nanoid } from "nanoid";
import { TodoItem } from "../TodoItem";
import "../../App.css";

export const TodoList = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [editedInput, setEditedInput] = useState(null);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //checks if input is empty
    if (!input) return;
    const randomKey = nanoid();
    // default value is false -- spread method is acting like append
    setList([
      { key: randomKey, value: input, editEnabled: false, isDeleted: false },
      ...list,
    ]);
    setInput("");
  };

  const handleDelete = (key) => {
    // filtering the item-key that's matching (items we want to take forward) and
    // excluding the item-key that's not matching (item that we want to delete) from the array (list is
    // an array)
    // setList(list.filter((item) => item.key !== key));
    const deletedList = list.map((item) => {
      return {
        ...item,
        // setting value to true
        isDeleted: item.key === key ? true : item.isDeleted,
      };
    });
    setList(deletedList);
  };

  const handleEdit = (editedItem) => {
    const editedList = list.map((item) => {
      return {
        ...item,
        // setting value to true
        editEnabled: item.key === editedItem.key ? true : false,
      };
    });
    setList(editedList);
    setEditedInput(editedItem.value);
  };

  const handleEditedInput = (e) => {
    setEditedInput(e.target.value);
  };

  console.log("edite input", editedInput);

  // const handleKeypress = (e, selectedItemKey) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     handleBlur(selectedItemKey);
  //   }
  // };

  const handleSave = (selectedItemKey) => {
    setList(
      list.map((newItem) => {
        return {
          key: newItem.key,
          value:
            newItem.key === selectedItemKey &&
            (editedInput || editedInput === "")
              ? editedInput
              : newItem.value,
          editEnabled: false,
          isDeleted: newItem.isDeleted,
        };
      })
    );
    setEditedInput(null);
  };

  return (
    <div className="container">
      {/* <div> */}
        <form className='formElement' onSubmit={handleSubmit}>
          <h1>To-do List</h1>
          <input
            id="addTextField"
            onChange={handleInput}
            value={input}
            placeholder="Enter your task here"
          />
          <button id="addTask" type="submit">
            Add
          </button>
          <ol>
            {list.map((item, index) => {
              return (
                <>
                  {item.editEnabled ? (
                    <div className="inputWithButton">
                      <input
                        id="textField"
                        autoFocus
                        value={editedInput}
                        onChange={handleEditedInput}
                      />
                      <span onClick={() => handleSave(item.key)}>Save</span>
                    </div>
                  ) : (
                    <>
                      {item.value && (
                        <TodoItem
                          isDeleted={item.isDeleted}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          item={item}
                          index={index}
                        />
                      )}
                    </>
                  )}
                </>
              );
            })}
          </ol>
        </form>
      {/* </div> */}
    </div>
  );
};

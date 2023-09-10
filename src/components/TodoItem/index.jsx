import "./index.css";
export const TodoItem = ({
  isDeleted,
  handleDelete,
  index,
  item,
  handleEdit,
}) => {
  return (
    <li
      key={index}
      style={{ textDecoration: isDeleted ? "line-through" : "none" }}
    >
      {item.value}
      {!item.isDeleted && (
        <div>
          <span id="edt" onClick={() => handleEdit(item)}>
            Edit
          </span>
          <span id="dlt" onClick={() => handleDelete(item.key)}>
            Delete
          </span>
        </div>
      )}
    </li>
  );
};

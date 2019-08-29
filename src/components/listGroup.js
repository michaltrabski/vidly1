import React, { Component } from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedGenres,
  onItemSelect
}) => {
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item._id}
          type="button"
          className={
            item[valueProperty] === selectedGenres
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onItemSelect(item[valueProperty])}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;

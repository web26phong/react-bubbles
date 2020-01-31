import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      const newArray = [...colors]
      
      const index = newArray.findIndex(item => item.id === res.data.id);
      const newArray2 = [...newArray.slice(0,index),
        {
          ...newArray[index],
          color: res.data.color
        },
        ...newArray.slice(index+1)
      ]
      updateColors(newArray2)
      // axiosWithAuth()
      // .get(`/colors`)
      // .then(res=>{
      //   updateColors(res.data)
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
    })
    .catch(err=>{
      console.log(err)
    })
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res=>{
      const newArray = [...colors];
      if (colors.indexOf(color) > -1){
        newArray.splice(colors.indexOf(color), 1)
      }
      updateColors(newArray);
      // axiosWithAuth()
      // .get(`/colors`)
      // .then(res=>{
      //   updateColors(res.data)
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
    })
    .catch(err=>{
      console.log(err)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;

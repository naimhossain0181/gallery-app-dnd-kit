import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';


const SortableImage = ({ image, index, handleImageChecked, isCheck }) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  // inline style react dnd overwritted default style thats why used inline it. it like as grid-item css style
  const inline = {
    transformOrigin: '0 0',
    maxHeight: index === 0 ? "100%" : "140px",
    maxWidth: index === 0 ? "100%" : "140px", 
    gridRowStart: index === 0 ? "span 2" : 'auto',  // Use 'auto' to reset grid property if index is not 0
    gridColumnStart: index === 0 ? "span 2" : 'auto',  // Use 'auto' to reset grid property if index is not 0
    ...style
  };

  return (
    <div className={`${isDragging ? 'box' : isCheck ? 'checked-item' : 'grid-item'} ${index === 0 ? 'large' : ''}`} style={inline} ref={setNodeRef} {...attributes} {...listeners}>
      <img src={image?.url} alt="" />
      <input className={`checkbox ${isCheck ? 'active' : 'hidden'}`} value={image.id} type="checkbox" onChange={() => handleImageChecked(image.id)} />
    </div>
  );
};

export default SortableImage;
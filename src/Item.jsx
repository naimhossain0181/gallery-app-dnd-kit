import React, { forwardRef } from 'react';

const Item =forwardRef(({image,DragImage,style,attributes,listeners,id, index,isDragging},ref)=>{
    const inlineStyles = {
        opacity:"1",
        transformOrigin: '0 0',
        maxHeight: index === 0 ? " ": 150, //Making the first image bigger than others
        maxWidth: index === 0 ? "100%" : 150,
        borderRadius: '10px',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundImage: `url("${DragImage?.image}")`,
        backgroundSize: "cover",
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gridRowStart: index === 0 ? "span 2" : null,
        gridColumnStart: index === 0 ? "span 2" : null,
        ...style,
    };
        return (
            <div className={`grid-item ${index===0?'large':''}`} style={inlineStyles}  ref={ref} {...attributes} {...listeners}>
            <img src={image?.image} alt="" />
            </div>
        );
}) 

export default Item;
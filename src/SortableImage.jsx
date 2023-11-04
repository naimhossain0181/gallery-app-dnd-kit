import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import Item from './Item';

const SortableImage = ({image,index}) => {
    const {isDragging,attributes,listeners,setNodeRef,transform,transition}=useSortable({id:image.id})
    const style={
        transition,
        transform:CSS.Transform.toString(transform),
    }
    return (
        
        <Item     
        ref={setNodeRef}
        style={style}
        image={image}
        index={index}
        isDragging={isDragging}
        attributes={attributes}
        listeners={listeners}/>
    );
};

export default SortableImage;
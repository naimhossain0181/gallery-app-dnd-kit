import {  useState } from "react";
import "./App.css";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  arraySwap
} from "@dnd-kit/sortable";
import data from "./data/db.json";
import GridLayout from "./GridLayout";
import SortableImage from "./SortableImage";
import Item from "./Item";

function App() {
  const [images, setImages] = useState(data);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setImages((prevsImage) => {
        const oldImageIndex = prevsImage.findIndex(
          (item) => item.id === active?.id
        );
        const newImageIndex = prevsImage.findIndex(
          (item) => item.id === over?.id
        );
        return arrayMove(prevsImage, oldImageIndex, newImageIndex);
      });
    }
    setActiveId(null);
  };
  const handleDragCancle = () => {
    setActiveId(null);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancle}
    >
      <SortableContext strategy={rectSortingStrategy} items={images}>
        <GridLayout>
          {images.map((image, index) => (
            <SortableImage key={image.id} image={image} index={index} />
          ))}
        </GridLayout>
      </SortableContext>
      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Item
            DragImage={images.find((item) => item.id === activeId)}
            id={activeId}
            index={images.findIndex(({ id }) => id === activeId)}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default App;

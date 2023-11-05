import { useEffect, useRef, useState } from "react";
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
} from "@dnd-kit/sortable";
import data from "./data/db.json";
import GridLayout from "./components/GridLayout";
import SortableImage from "./components/SortableImage";
import Swal from "sweetalert2";
import Header from "./components/Header";

function App() {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor)
  );
  const [images, setImages] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draggedImg, setDraggedImg] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const uploadRef = useRef(null);

  //useed handleDragStart  to getting draged image id
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    const findActiveImage = images.find((item) => item.id === event.active.id);
    setDraggedImg(findActiveImage);
  };

  // used handleDragEnd to reorder the image position
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
  // used handleDragCancle if user cancle their action
  const handleDragCancle = () => {
    setActiveId(null);
  };

  // image items checke and unchecked and select for delete action
  const handleImageChecked = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // selected item delete handller and wranrning
  const handleDeleteSelectedImages = () => {
    Swal.fire({
      title: "Do you want to delete the images?",
      showDenyButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      // main function of deleted item
      if (result.isConfirmed) {
        const updatedItems = images.filter(
          (item) => !selectedItems.includes(item.id)
        );
        setImages(updatedItems);
        setSelectedItems([]);
      }
    })
  };
  // upload handdler
  const handleImageUpload = (e) => {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];
    const uploadFile = e.target.files[0];
    if (acceptedImageTypes.includes(uploadFile.type)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // console.log(event.target.result)
        setImages([
          ...images,
          { id: images.length + Date.now(), url: event.target.result },
        ]);
      };
      if (uploadFile) {
        reader.readAsDataURL(uploadFile);
      }
    }
  };
  // data get from api or db
  useEffect(() => {
    setImages(data);
  }, []);

  return (
    <section className="container">
      <Header selectedItems={selectedItems} handleDeleteSelectedImages={handleDeleteSelectedImages} />
      <div className="gallery-container">
        {/* this is from dnd@kit . DndContext is The main Area of Drag and drop element */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancle}
        >
          {/* Used for drag and drop item and reorder list */}
          <SortableContext strategy={rectSortingStrategy} items={images}>
            <GridLayout>
              {images.map((image, index) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  index={index}
                  handleImageChecked={handleImageChecked}
                  isCheck={selectedItems.includes(image.id)}
                />
              ))}

              {/* file upload  */}
              <div
                className="grid-item upload"
                onClick={() => uploadRef.current.click()}
              >
                <button className="upload">Upload Image</button>
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                ref={uploadRef}
                onChange={handleImageUpload}
              />
            </GridLayout>
          </SortableContext>

          {/* Copy of Selected image. it avoid Default drag opacity element and more */}
          <DragOverlay adjustScale={true}>
            {activeId ? (
              <div>
                <img src={draggedImg.url} alt="" />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
}

export default App;

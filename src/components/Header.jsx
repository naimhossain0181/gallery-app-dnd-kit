import React from 'react';

const Header = ({selectedItems,handleDeleteSelectedImages}) => {
    return (
        <div className="header-main">
        {selectedItems.length > 0 ? (
          <div className="action-nav">
            <h1>
              {" "}
              <span style={{ color: "red" }}>{selectedItems.length}</span>{" "}
              {selectedItems.length > 1 ? "Images" : "Image"} selected
            </h1>
            <button className="delete-btn" onClick={handleDeleteSelectedImages}>
              Delete
            </button>
          </div>
        ) : (
          <strong>Gallery</strong>
        )}
      </div>
    );
};

export default Header;
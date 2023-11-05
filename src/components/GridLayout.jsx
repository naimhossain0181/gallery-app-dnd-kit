import React from 'react';

const GridLayout = ({ children }) => {
    return (
        <div
            className='grid-container '
        >
            {children}
        </div>
    );
};

export default GridLayout;
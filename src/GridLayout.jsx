import React from 'react';

const GridLayout = ({children}) => {
    return (
        <div
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill,  minmax(150px, 1fr))`,
            gridGap: 10,
        }}
    >
        {children}
    </div>
    );
};

export default GridLayout;
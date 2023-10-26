import React from 'react'

const Img = (props) => {
    const { src, height, width } = props;

    return (
        <img src={src} height={height} width={width} alt='' />
    )
}

export default Img
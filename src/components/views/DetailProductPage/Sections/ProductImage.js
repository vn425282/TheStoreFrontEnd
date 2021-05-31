import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        let images = [];
            images.push({
                original: `http://localhost:3233/${props.detail}`,
                thumbnail: `http://localhost:3233/${props.detail}`
        })
        setImages(images);
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage

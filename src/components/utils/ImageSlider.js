import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {(
                    <div>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:3233/${props.images}`} alt="productImage" />
                    </div>
                )}
            </Carousel>
        </div>
    )
}

export default ImageSlider

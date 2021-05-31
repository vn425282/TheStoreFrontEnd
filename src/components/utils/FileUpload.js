import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
import { API_ENDPOINT } from "../Config";

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'content-type': 'multipart/form-data'
              }
        };

        formData.append("file", files[0])

        Axios.post(API_ENDPOINT + 'product/uploadImage', formData, config)
            .then(response => {
                if (response.data !== "") {
                    console.log(response.data);
                    setImages([...Images, response.data.data])
                    props.refreshFunction([...Images, response.data.data])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

    function DropZoneCustom() {
        return Images.length > 0 ?  <></> :
         <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}
            >
            {({ getRootProps, getInputProps }) => (
                <div style={{
                    width: '300px', height: '240px', border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                    {...getRootProps()}
                >
                    {console.log('getRootProps', { ...getRootProps() })}
                    {console.log('getInputProps', { ...getInputProps() })}
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{ fontSize: '3rem' }} />

                </div>
                    )}
        </Dropzone>;
      }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <DropZoneCustom />

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:3233/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload

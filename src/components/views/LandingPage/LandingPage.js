import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import { API_ENDPOINT } from "../../Config";

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        price: []
    })

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        Axios.post(API_ENDPOINT + 'product/getProducts')
            .then(response => {
                console.log(response.data.message);
                if (response.data) {
                    setProducts(response.data.message);
                } else {
                    alert('Failed to fetch product data');
                }
            });
    }

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
                    <Card
                        hoverable={true}
                        cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.image} /></a>}
                    >
                        <Meta
                            title={product.title}
                            description={`$${product.price}`}
                        />
                    </Card>
                </Col>
    })

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Product Listing</h2>
            </div>

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No product yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>


                </div>
            }
        </div>
    )
}

export default LandingPage

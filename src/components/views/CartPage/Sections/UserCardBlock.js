import React from 'react'

function UserCardBlock(props) {
    console.log(props);

    const renderCartImage = (image) => {
        return `http://localhost:3233/${image}`
    }

    const renderItems = () => (
        props.products && props.products.map((product ,index ) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} alt="product" 
                    src={renderCartImage(product.image)} />
                </td> 
                <td>{product.quantity} EA</td>
                <td>$ {product.price} </td>
                <td><button 
                onClick={()=> props.removeItem(product._id)}
                >Remove </button> </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock

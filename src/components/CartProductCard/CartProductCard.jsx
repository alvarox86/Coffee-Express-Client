import "./CartProductCard.css"

function CartProductCard({eachCardData, handleDeleteCartProduct}) {

  return (
    <div key={eachCardData._id} className="cartProductCard">
        <p>{eachCardData.name}</p>
        <p>{eachCardData.price}</p>
        <p>{eachCardData.description}</p>
        <p>{eachCardData.origin.country}</p>
        <p>{eachCardData.type}</p>
        <div>
            <img src={eachCardData.imageUrl} alt="Product picture" className="imgProductCart"/>
        </div>
        <button onClick={()=> handleDeleteCartProduct(eachCardData._id)}>
          Delete
        </button>
    </div>
  )
}

export default CartProductCard
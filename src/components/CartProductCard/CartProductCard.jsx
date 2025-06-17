import "./CartProductCard.css"

function CartProductCard({eachCardData}) {

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
    </div>
  )
}

export default CartProductCard
import { Link } from "react-router-dom";
// import {Rating} from '@mui/lab';
const ProductCard = ({product})=>{
    return (
        <>
        <Link className="productCard" to = {`/shopfusion/product/${product._id}`}>
        {
            product.image ? 
            <img src={product.images[0].url} alt={product.name}></img>:
            <img src={product.images} alt = {product.name}></img>
        }
        <p>{product.name}</p>
        <div>
            <span className="productCardSpan">
                {" "}
            ( {product.numOfReviews === 0 ? "No" : product.numOfReviews}{" "}
            {product.numOfReviews <= 1 ? "Review" : "Reviews"} )
            </span>
        </div>
        <span>{`₹${product.price}`}</span>
        </Link>
        </>
    )
}
export default ProductCard;
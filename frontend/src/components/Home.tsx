
function Home(){
    return (
        <>

          <div className="Home-section">
            <h1>Welcome to ShopFusion</h1>
            <h2>Find Amazing Product Below</h2>
            <a href="#container">
              <button>
                {/* Scroll <FaMouse />{" "} */}
              </button>
            </a>
          </div>
          <div className="homeHeading">Featured Products</div>
          <div className="container" id="container">
            {/* {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))} */}
          </div>
        </>
    )
}

export default Home;
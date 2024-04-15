import React from 'react';
import { getBestSellingProductVariations } from 'Services/Products';
import { searchProductVariations } from 'Services/Products'
import { cartState } from 'states/cartState';
function SearchInput(props) {
    const { onChange, value } = props;
    return (
        <div class="flex px-2 flex-row relative">
            <div class="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="text"
                class="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
                placeholder="Search Products"
                value={value}
                onChange={onChange}
            // x-model="keyword" 
            />
        </div>
    )
}

function ProductCard(props) {
    const { product } = props;
    const [cart, setCart] = cartState.use();
    return (
        <div class="card   bg-gray-100 shadow-xl">
            <figure><img className='cover h-48 w-full' src={product.image} alt={product.name} /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    {product.name}
                </h2>
                <div class="badge badge-secondary">{product.sku}</div>
                <div class="card-actions justify-end">
                    <div class="badge badge-accent badge-outline">Rs. {product.default_sell_price}</div>
                    <div class="btn btn-success btn-sm "
                        onClick={() => {
                            if (product.quantity === 0) {
                                alert('Product out of stock')
                                return;
                            }
                            setCart(cart => {
                                const newCart = [...cart];
                                const index = newCart.findIndex(item => item.id === product.id);
                                if (index === -1) {
                                    newCart.push({
                                        id: product.id,
                                        name: product.name,
                                        quantity: 1,
                                        sell_price: product.default_sell_price,
                                        product_id: product.product_id,
                                        image: product.image,
                                        original_quantity: product.quantity
                                    })
                                } else {

                                    newCart[index].quantity += 1;
                                    if (newCart[index].quantity > product.quantity) {
                                        alert('Product out of stock')
                                        newCart[index].quantity = product.quantity;
                                    }
                                }
                                return newCart;
                            })
                        }}
                    >ADD TO CART</div>
                </div>
            </div>
        </div>
    )
}

export default function PageContent(props) {
    const [products, setProducts] = React.useState([])
    const [query, setQuery] = React.useState('')

    const [cart, setCart] = cartState.use();
    React.useEffect(() => {
        getBestSellingProductVariations().then(res => {
            setProducts(res)
        }
        )
    }, [cart])
    return (
        <div class="flex flex-col bg-blue-gray-50 h-full w-full py-4">
            <SearchInput
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    searchProductVariations(e.target.value).then(res => {
                        setProducts(res)
                    })
                }}
            />
            <div class="h-full overflow-hidden mt-4">
                <div class="h-full overflow-y-auto px-2">
                    {/* When We Have No Products */}
                    {products.length === 0 && (<div class="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25"
                        x-show="products.length === 0">
                        <div class="w-full text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 inline-block" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                            <p class="text-xl">
                                {query != '' ? 'No Products Found' : 'No Products Yet'}
                                <br />
                            </p>
                        </div>
                    </div>)}
                    <div
                        // x-show="filteredProducts().length" 
                        class="grid grid-cols-4 gap-4 pb-3">
                        {/* When We Have Products */}
                        {products.map((product, index) => (
                            <ProductCard product={product} key={index} />
                        ))}
                    </div>
                </div>
            </div >
        </div >
    )
}

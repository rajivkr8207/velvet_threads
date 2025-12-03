'use client'
import { addToCart } from '@/lib/features/cart/cartSlice'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const ProductCard = ({ product }) => {
    const router = useRouter()
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);
    const addToCartHandler = (id) => {
        dispatch(addToCart({ productId: id }))
        toast.success('add to cart successfull.')
    }
    return (
        <div className=' group max-xl:mx-auto'>
            <Link href={`/product/${product.id}`} className=' group max-xl:mx-auto'>
                <div className='bg-[var(--product-card)] h-40  sm:w-60 sm:h-68 rounded-lg flex items-center justify-center'>
                    <Image width={500} height={500} className='max-h-30 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300' src={product.images[0]} alt="" />
                </div>
                <div className='flex justify-between gap-3 text-sm text-[var(--text-gray)] pt-2 max-w-60'>
                    <div>
                        <p className='text-xl font-semibold'>{currency}{product.price}</p>
                        <p className='line-through'>{currency}{product.mrp}</p>

                        <p>{product.name}</p>
                        <div className='flex'>
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
            <div className='justify-center'>
                <button onClick={() => !cart[product.id] ? addToCartHandler(product.id) : router.push('/cart')} className="bg-slate-800 mx-auto mt-2 text-white lg:px-10 px-4 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition">
                    {!cart[product.id] ? 'Add to Cart' : 'View Cart'}
                </button>
            </div>
        </div>

    )
}

export default ProductCard
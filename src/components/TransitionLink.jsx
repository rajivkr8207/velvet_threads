'use client'
import { animatePageOut } from '@/utils/animations'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const TransitionLink = ({href, label }) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = ()=>{
        if(pathname !== href){
            animatePageOut(href, router)
        }
    }
    return (
        <Link onClick={handleClick} className="hover:text-green-600 transition" href={href}>{label}</Link>

    )
}

export default TransitionLink
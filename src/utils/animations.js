import gsap from 'gsap'
import React from 'react'

export const animatePageIn = () => {
    const bannerone = document.getElementById('banner-1')
    const bannertwo = document.getElementById('banner-2')
    const bannerthree = document.getElementById('banner-3')
    const bannerfour = document.getElementById('banner-4')


    if (bannerone && bannertwo && bannerthree && bannerfour) {
        const tl = gsap.timeline()

        tl.set([bannerone, bannertwo, bannerthree, bannerfour], {
            yPercent: 0,
        }).to([bannerone, bannertwo, bannerthree, bannerfour], {
            yPercent: 100,
            stagger: 0.2
        })

    }
}
export const animatePageOut = (href, router) => {
    const bannerone = document.getElementById('banner-1')
    const bannertwo = document.getElementById('banner-2')
    const bannerthree = document.getElementById('banner-3')
    const bannerfour = document.getElementById('banner-4')


    if (bannerone && bannertwo && bannerthree && bannerfour) {
        const tl = gsap.timeline()

        tl.set([bannerone, bannertwo, bannerthree, bannerfour], {
            yPercent: -100,
        }).to([bannerone, bannertwo, bannerthree, bannerfour], {
            yPercent: 0,
            stagger: 0.2,
            onComplete:()=>{
                router.push(href)
            }
        })

    }
}

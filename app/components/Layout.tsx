import {PropsWithChildren, useEffect, useState} from 'react'
import Nav from './Nav'
import Footer from './Footer'

type LayoutProps = {}

const Layout = ({
                    children,
                }: PropsWithChildren<LayoutProps>) => {
    const [navHeight, setNavHeight] = useState(0);
    useEffect(() => {
        document.documentElement.className = 'light'
        const nav = document.querySelector('nav');
        if (nav) {
            setNavHeight(nav.offsetHeight);
        }
    }, [])

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="fixed top-0 w-full z-10"><Nav/></div>
                <div className="flex-1" style={{paddingTop: `${navHeight}px`}}>
                    <main>{children}</main>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Layout

import React from 'react'
import './ScrollBtn.scss'
import ScrollUp from '../../../svg/scroll_up.svg'
import ScrollDown from '../../../svg/scroll_down.svg'

const ScrollBtn = () => {
    const scrollToTop = () => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }
    const scrollToBottom = () => {
        window.scroll({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }

    return (
        <div className="scroll-container">
            <button className="top first" onClick={scrollToTop} type="button" >
                <img src={ScrollUp} alt='' />
            </button>
            <button className="top" onClick={scrollToBottom} type="button" >
                <img src={ScrollDown} alt='' />
            </button>
        </div>
    )
}

export default ScrollBtn
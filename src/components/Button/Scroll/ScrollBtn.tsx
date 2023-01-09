import React from 'react'
import './ScrollBtn.scss'

const ScrollBtn = () => {
    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }
    const scrollToBottom = () => {
        window.scroll({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })
    }
    return (
        <div className="scroll-container">
            <button className="top first" onClick={scrollToTop} type="button" >
                <svg width="25" height="11" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.2249 16.2751C27.4567 16.0438 27.6406 15.769 27.766 15.4666C27.8915 15.1642 27.9561 14.84 27.9561 14.5126C27.9561 14.1851 27.8915 13.8609 27.766 13.5585C27.6406 13.2561 27.4567 12.9813 27.2249 12.7501L15.7499 1.27506C15.5187 1.0433 15.2439 0.859428 14.9415 0.733974C14.6391 0.608521 14.3149 0.543945 13.9874 0.543945C13.66 0.543945 13.3358 0.608521 13.0334 0.733974C12.7309 0.859428 12.4562 1.0433 12.2249 1.27506L0.749943 12.7501C0.518488 12.9815 0.334887 13.2563 0.209625 13.5587C0.084362 13.8611 0.0198917 14.1852 0.0198917 14.5126C0.0198917 14.8399 0.084362 15.164 0.209625 15.4664C0.334887 15.7688 0.518488 16.0436 0.749943 16.2751C0.981398 16.5065 1.25617 16.6901 1.55858 16.8154C1.86099 16.9406 2.18512 17.0051 2.51244 17.0051C2.83977 17.0051 3.16389 16.9406 3.4663 16.8154C3.76871 16.6901 4.04349 16.5065 4.27494 16.2751L13.9999 6.57506L23.6999 16.2751C24.6749 17.2251 26.2749 17.2251 27.2249 16.2751Z" fill="#fff" />
                </svg>
            </button>
            <button className="top" onClick={scrollToBottom} type="button" >
                <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.775056 1.72494C0.543297 1.95623 0.359428 2.23095 0.233974 2.53338C0.108521 2.83582 0.0439453 3.16002 0.0439453 3.48744C0.0439453 3.81486 0.108521 4.13907 0.233974 4.4415C0.359428 4.74394 0.543297 5.01866 0.775056 5.24994L12.2501 16.7249C12.4813 16.9567 12.7561 17.1406 13.0585 17.266C13.3609 17.3915 13.6851 17.4561 14.0126 17.4561C14.34 17.4561 14.6642 17.3915 14.9666 17.266C15.2691 17.1406 15.5438 16.9567 15.7751 16.7249L27.2501 5.24994C27.4815 5.01849 27.6651 4.74371 27.7904 4.4413C27.9156 4.13889 27.9801 3.81477 27.9801 3.48744C27.9801 3.16012 27.9156 2.836 27.7904 2.53359C27.6651 2.23118 27.4815 1.9564 27.2501 1.72494C27.0186 1.49349 26.7438 1.30989 26.4414 1.18463C26.139 1.05936 25.8149 0.994892 25.4876 0.994892C25.1602 0.994892 24.8361 1.05936 24.5337 1.18463C24.2313 1.30989 23.9565 1.49349 23.7251 1.72494L14.0001 11.4249L4.30006 1.72494C3.32506 0.774944 1.72506 0.774944 0.775056 1.72494V1.72494Z" fill="#fff" />
                </svg>
            </button>
        </div>
    )
}

export default ScrollBtn
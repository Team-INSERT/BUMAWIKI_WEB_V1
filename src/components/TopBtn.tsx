import React from 'react';
import '../style/components-style/TopBtn.scss';

const TopBtn = () => {
    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div className="scroll-container">
            <button id="top" onClick={scrollToTop} type="button" >
                <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.2249 16.2751C27.4567 16.0438 27.6406 15.769 27.766 15.4666C27.8915 15.1642 27.9561 14.84 27.9561 14.5126C27.9561 14.1851 27.8915 13.8609 27.766 13.5585C27.6406 13.2561 27.4567 12.9813 27.2249 12.7501L15.7499 1.27506C15.5187 1.0433 15.2439 0.859428 14.9415 0.733974C14.6391 0.608521 14.3149 0.543945 13.9874 0.543945C13.66 0.543945 13.3358 0.608521 13.0334 0.733974C12.7309 0.859428 12.4562 1.0433 12.2249 1.27506L0.749943 12.7501C0.518488 12.9815 0.334887 13.2563 0.209625 13.5587C0.084362 13.8611 0.0198917 14.1852 0.0198917 14.5126C0.0198917 14.8399 0.084362 15.164 0.209625 15.4664C0.334887 15.7688 0.518488 16.0436 0.749943 16.2751C0.981398 16.5065 1.25617 16.6901 1.55858 16.8154C1.86099 16.9406 2.18512 17.0051 2.51244 17.0051C2.83977 17.0051 3.16389 16.9406 3.4663 16.8154C3.76871 16.6901 4.04349 16.5065 4.27494 16.2751L13.9999 6.57506L23.6999 16.2751C24.6749 17.2251 26.2749 17.2251 27.2249 16.2751Z" fill="#fff"/>
                </svg>
            </button>
        </div>
    )
}

export default TopBtn;
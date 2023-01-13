import React from 'react'
import './Footer.scss'
import Github from '../../../svg/github.svg'
import Instagram from '../../../svg/instagram.svg'

const Footer = () => {
    return (
        <div className='footer-wrap'>
            <div className='footer-box'>
                <div className='href-wrap' >
                    <a href={'https://github.com/Original-Gimchi'} target={'_blank'} rel="noreferrer" className='github-logo-box'>
                        <img src={Github} alt='' />
                    </a>
                    <div className='column-line' />
                    <a href={'https://www.instagram.com/#'} className='instagram-logo-box' target={'_blank'} rel="noreferrer" >
                        <img src={Instagram} alt='' />
                    </a>
                </div>
                <div className='project-info-box'>
                    <span className='project-info'>buma.wiki | bumawiki@gmail.com | BSSM | TEAM OG | PROJECT BUMAWIKI</span>
                </div>
                <div className='project-info-box'>
                    <span className='project-info'>1393, Garak-daero, Gangseo-gu, Busan, Republic of Korea</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
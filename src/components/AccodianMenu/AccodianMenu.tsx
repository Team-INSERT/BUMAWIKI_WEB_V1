import React from 'react'
import AccodianType from 'types/accodian'
import './AccodianMenu.scss'
import ArrowRight from '../../svg/arrow_right.svg'
import ArrowDown from '../../svg/arrow_down.svg'

const AccodianMenu = ({ children, name, isOpen }: AccodianType) => {
    const [detail, setDetail] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (isOpen === false) setDetail(false)
        // eslint-disable-next-line
    }, [])

    const onClickDetail = () => {
        setDetail(detail => !detail)
    }

    return (
        <div>
            <div className='title-line-wrap' onClick={onClickDetail} >
                <img src={detail ? ArrowRight : ArrowDown} alt='' />
                {detail ? <span className='title-line-name'>{name}</span> : <span className='title-line-name opacity'>{name}</span>}
            </div>
            <div className='line' style={{ width: '100%' }} />
            <div>{detail ? children : ''}</div>
            <div className='title-line-margin-div' />
        </div>
    )
}

export default AccodianMenu

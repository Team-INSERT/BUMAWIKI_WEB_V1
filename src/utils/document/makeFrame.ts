import React from 'react'
import FrameColor from 'types/color.type'
import * as FC from 'utils'

const makeFrame = (color1: string, color2: string) => {
    const [colors, setColors] = React.useState<FrameColor>({
        frameColor: '#274168',
        textColor: 'white',
    })
    setColors({ ...colors, frameColor: color1, textColor: color2 })
}

export default makeFrame;
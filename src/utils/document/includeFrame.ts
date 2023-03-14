import React, { useEffect, useState } from 'react'
import * as api from 'api/getDocs'

const IncludeFrame = async (frameTitle: string) => {
    const frameContents = await api.getDocs(frameTitle)
    const resolve1 = Promise.resolve(frameContents)
    resolve1.then((value) => {
        console.log(value.contents)
        // setDocs({ ...docs, contents: value.contents })
        return value.contents
    });
}

export default IncludeFrame
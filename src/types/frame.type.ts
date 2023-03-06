import { ButtonHTMLAttributes } from "react"

interface Frame extends ButtonHTMLAttributes<HTMLButtonElement> {
    row: number
    column: number
    title: string
    head: string
    contents: string

}

export default Frame

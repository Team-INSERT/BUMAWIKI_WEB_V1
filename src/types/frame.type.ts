import { ButtonHTMLAttributes } from "react"

interface Frame extends ButtonHTMLAttributes<HTMLButtonElement> {
    row: number
    column: number
}

export default Frame
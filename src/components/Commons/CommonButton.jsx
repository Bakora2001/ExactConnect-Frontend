import { Button } from "@mui/material"

export const CommonButton = ({label, variant, color}) => {
    return (
        <Button variant={variant} color={color}>{label}</Button>
    )
}
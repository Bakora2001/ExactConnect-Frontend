import { Box } from "@mui/material"
import { Header } from "../Commons/Header"
import { MainContent } from "../MainContent"

export const Home = () => {
    return (
        <>
            <Box sx={{ backgroundColor: "#7C25BA"}}>
               <Header />
               <MainContent />
            </Box>
        </>
    )
}
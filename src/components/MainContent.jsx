import { Grid2, Typography } from "@mui/material"
import TechImage from '../../public/Tech-image.png';

export const MainContent = () => {
    return (
        <>
            <Grid2 
            container
            sx={{my: 10, mx: 15 }}
            >
                <Grid2 
                item 
                size={6} 
                >
                    <Typography color="#FFFFFF" component="h2"
                        sx={{ fontSize: "24px" }}
                        pt={20}
                        px={12}
                    >
                        Need Precise Residential IPs, RDP vps, Virtual Credit Cards or Non-Voip Numbers ?
                    </Typography>
                </Grid2>
                <Grid2 item size={6} padding={10}>
                    <img src={TechImage} alt="" />
                </Grid2>
            </Grid2>
        </>
    )
}
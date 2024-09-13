import { Box, Divider, Grid2, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Header } from "../Commons/Header"
import { MainContent } from "../MainContent"
import { CommonButton } from "../Commons/CommonButton"

export const Home = () => {
    return (
        <>
            <Box sx={{ backgroundColor: "#7C25BA"}}>
               <Header />
               <MainContent />
            </Box>
            <Box>
                <Grid2 container direction="column" alignItems="center">
                    <Grid2  item >
                        <Typography
                            color="#000000"
                            variant="h4"
                            sx={{
                                textAlign: "center",
                                position: "relative",
                                display: "inline-block",
                                '&:after': {
                                content: '""',
                                display: "block",
                                width: "70%",
                                margin: "0 auto",
                                borderBottom: "2px solid",
                                borderColor: "black",
                                marginTop: "16px",
                                }
                            }}
                            >
                            Why Choose Our Services ?
                        </Typography>
                    </Grid2>
                    <Grid2 container item direction="column" sx={{ paddingTop: "40px"}}>
                        <Grid2>
                            <Typography
                                color="#000000"
                                variant="h6"
                                sx={{
                                    textAlign: "center",
                                    position: "relative",
                                    display: "inline-block",
                                    '&:after': {
                                    content: '""',
                                    display: "block",
                                    width: "70%",
                                    margin: "0 auto",
                                    borderBottom: "2px solid",
                                    borderColor: "black",
                                    marginTop: "16px",
                                    }
                                }}
                                >
                                Residential Proxies
                            </Typography>
                        </Grid2>
                        <Grid2 container item justifyContent="space-around" gap={8}>
                            <Grid2>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Exact IP for Online Accounts Creation" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports Guaranteed 100%  Online Mask Identification " />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Very Affordable pricing for 24hr and Monthly Residential IPs" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports SOCKS 5 / HTTP" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Cost Effective" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="No setup fee" />
                                    </ListItem>
                                </List>
                            </Grid2>
                            <Grid2>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Exact IP for Online Accounts Creation" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports Guaranteed 100%  Online Mask Identification " />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Very Affordable pricing for 24hr and Monthly Residential IPs" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports SOCKS 5 / HTTP" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Cost Effective" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="No setup fee" />
                                    </ListItem>
                                </List>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 container item direction="column" sx={{ paddingTop: "40px"}}>
                        <Grid2 item>
                            <Typography
                                color="#000000"
                                variant="h6"
                                sx={{
                                    textAlign: "center",
                                    position: "relative",
                                    display: "inline-block",
                                    '&:after': {
                                    content: '""',
                                    display: "block",
                                    width: "70%",
                                    margin: "0 auto",
                                    borderBottom: "2px solid",
                                    borderColor: "black",
                                    marginTop: "16px",
                                    }
                                }}
                                >
                                 VPS Server
                            </Typography>
                        </Grid2>
                        <Grid2 container item justifyContent="space-around" gap={8}>
                            <Grid2 item>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Exact IP for Online Accounts Creation" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports Guaranteed 100%  Online Mask Identification " />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Very Affordable pricing for 24hr and Monthly Residential IPs" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports SOCKS 5 / HTTP" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Cost Effective" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="No setup fee" />
                                    </ListItem>
                                </List>
                            </Grid2>
                            <Grid2 item>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Exact IP for Online Accounts Creation" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports Guaranteed 100%  Online Mask Identification " />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Very Affordable pricing for 24hr and Monthly Residential IPs" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports SOCKS 5 / HTTP" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Cost Effective" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="No setup fee" />
                                    </ListItem>
                                </List>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 container item direction="column" sx={{ paddingTop: "40px"}}>
                        <Grid2 item>
                            <Typography
                                color="#000000"
                                variant="h6"
                                sx={{
                                    textAlign: "center",
                                    position: "relative",
                                    display: "inline-block",
                                    '&:after': {
                                    content: '""',
                                    display: "block",
                                    width: "70%",
                                    margin: "0 auto",
                                    borderBottom: "2px solid",
                                    borderColor: "black",
                                    marginTop: "16px",
                                    }
                                }}
                                >
                                Virtual Credit Card
                            </Typography>
                        </Grid2>
                        <Grid2 container item justifyContent="space-around" gap={8}>
                            <Grid2 item>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Exact IP for Online Accounts Creation" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports Guaranteed 100%  Online Mask Identification " />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Very Affordable pricing for 24hr and Monthly Residential IPs" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports SOCKS 5 / HTTP" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Cost Effective" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="No setup fee" />
                                    </ListItem>
                                </List>
                            </Grid2>
                            <Grid2 item>
                                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Exact IP for Online Accounts Creation" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports Guaranteed 100%  Online Mask Identification " />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Very Affordable pricing for 24hr and Monthly Residential IPs" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Supports SOCKS 5 / HTTP" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="Cost Effective" />
                                    </ListItem>
                                    <ListItem sx={{ display: 'list-item' }}>
                                        <ListItemText primary="No setup fee" />
                                    </ListItem>
                                </List>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
}
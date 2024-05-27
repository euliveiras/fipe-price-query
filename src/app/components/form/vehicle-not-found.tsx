import blue from "@mui/material/colors/blue";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function VehicleNotFounded() {
  return (
    <Box
      display={"flex"}
      width={1}
      sx={{ backgroundColor: blue[400], borderRadius: 1, p: 2 }}
      justifyContent={"center"}
      alignItems={"center"}
      gap={1}
      mt={3}
      color={"white"}
    >
      <Typography
        variant="title"
        component="h2"
        width={"fit-content"}
        fontSize={"1.5rem"}
        textAlign={"center"}
        color="inherit"
      >
        Nenhuma informação encontrada
      </Typography>
    </Box>
  );
}

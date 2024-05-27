import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function Header() {
  return (
    <Box component="header" display={"grid"} gap={0.1}>
      <Typography
        component="h1"
        typography={"title"}
        marginX={"auto"}
        width={"fit-content"}
      >
        Tabela Fipe
      </Typography>
      <Typography component="h2" typography={"subtitle1"}>
        Consulte o valor de um veículo de forma gratuita
      </Typography>
    </Box>
  );
}

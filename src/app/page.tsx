import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Header() {
  return (
    <Box component="header" display={"grid"} gap={1}>
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

export default function Home() {
  return (
    <Box component="main" height={1}>
      <Box height={1} width={1} display="flex" justifyContent="center" p={2}>
        <Box minHeight={100} minWidth={100} paddingTop={10}>
          <Header />
        </Box>
      </Box>
    </Box>
  );
}

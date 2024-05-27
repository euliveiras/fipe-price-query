import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import green from "@mui/material/colors/green";

type PriceProps = {
  vehicle: { name: string; price: string };
};

export function Price({ vehicle }: PriceProps) {
  return (
    <Stack
      width={1}
      sx={{ backgroundColor: green[400], borderRadius: 1, p: 1 }}
      alignItems={"center"}
      gap={1}
      mt={3}
    >
      <Typography
        variant="title"
        component="h2"
        width={"fit-content"}
        fontSize={"1.5rem"}
        textAlign={"center"}
      >
        Tabela Fipe: Preço {vehicle.name}
      </Typography>
      <Typography
        width={"fit-content"}
        fontWeight={"bold"}
        py={1}
        px={2}
        sx={{ backgroundColor: green["600"], borderRadius: 100 }}
      >
        {vehicle.price}
      </Typography>
      <Typography variant="caption" width={"fit-content"}>
        Este é o preço de compra do veículo
      </Typography>
    </Stack>
  );
}

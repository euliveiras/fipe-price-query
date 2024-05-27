import { useFormStatus } from "react-dom";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

export function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type={pending ? "button" : "submit"}
      variant="contained"
      color="secondary"
      disabled={disabled}
      sx={{
        width: "fit-content",
        paddingX: 8,
        marginX: "auto",
        marginTop: 1,
      }}
    >
      {pending ? <CircularProgress size={28} color="inherit" /> : "Consultar"}
    </Button>
  );
}

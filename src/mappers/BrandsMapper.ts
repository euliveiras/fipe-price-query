import { Brand } from "@/app/components/hooks/useVehicle";

export class BrandsMapper {
  static toFront(data: { codigo: string; nome: string }): Brand {
    return { name: data.nome, code: data.codigo };
  }
}

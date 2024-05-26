import { Model } from "@/app/components/hooks/useVehicle";

export class ModelMapper {
  static toFront(data: { codigo: string; nome: string }): Model {
    return { name: data.nome, code: data.codigo };
  }
}

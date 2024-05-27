import { Model } from "@/models/model";

export class ModelMapper {
  static toFront(data: { codigo: string; nome: string }): Model {
    return { name: data.nome, code: data.codigo };
  }
}

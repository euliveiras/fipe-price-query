import { Year } from "@/models/year";

export class YearMapper {
  static toFront(data: { codigo: string; nome: string }): Year {
    return { name: data.nome, code: data.codigo };
  }
}

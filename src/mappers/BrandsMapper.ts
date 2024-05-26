import { Brand } from "@/app/components/hooks/useVehicle";

export class BrandsMapper {
  static toFront(data: { code: string; name: string }): Brand {
    return { name: data.name, code: data.code };
  }
}

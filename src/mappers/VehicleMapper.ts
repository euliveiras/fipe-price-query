import { Vehicle } from "@/app/components/hooks/useVehicle";

export class VehicleMapper {
  static toFront(data: {
    Valor: string;
    Marca: string;
    Modelo: string;
  }): Vehicle {
    return { brand: data.Marca, model: data.Modelo, price: data.Valor };
  }
}

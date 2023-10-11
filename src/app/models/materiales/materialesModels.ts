
export interface Respuesta{
  estado: boolean;
  respuesta: any;
  mensaje: string;
}

export interface Material {
  id:            number;
  name:          string;
  type_material: string;
  description:   string;
  amount:        number;
  und_m:         UndM | string;
  bodega:        string;
}

export enum UndM {
  Bultos = "BULTOS",
  Cuñete = "CUÑETE",
  Galon = "GALON",
  Kg = "KG",
  Libras = "LIBRAS",
  Litro = "LITRO",
  M2 = "M2",
  M3 = "M3",
  MetroLineal = "METRO LINEAL",
  Unidades = "UNIDADES",
}


export interface Materiales{
  categoria: string,
  material: string,
  und_medida: string,
  cantidad: number,
  descripcion: string,
  bodega: string
}


export interface Filtro{
  id: number;
  name: string;
  state: boolean;
}
// Modelo que nos llega de la BBDD
export interface IHero {
  id: number;
  nombre: string;
  habilidad: string;
}

export class Hero {
  id: number;
  name: string;
  ability: string;

  constructor(id: number, name: string, ability: string) {
    this.id = id;
    this.name = name;
    this.ability = ability;
  }

  // Conversor del objeto de BBDD al que usaremos en la app
  public static adaptFromApi(data: IHero): Hero {
    return {
      id: data.id,
      name: data.nombre,
      ability: data.habilidad,
    };
  }
  // Conversor del objeto de app a BBDD
  public static adaptToApi(data: Hero): IHero {
    return {
      id: data.id,
      nombre: data.name,
      habilidad: data.ability,
    };
  }
}

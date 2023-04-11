export enum Entity {
  Space = "SPACE",
  POLYanet = "POLYANET",
  SOLoon = "SOLOON",
  BlueSoloon = "BLUE_SOLOON",
  RedSoloon = "RED_SOLOON",
  PurpleSoloon = "PURPLE_SOLOON",
  WhiteSoloon = "WHITE_SOLOON",
  Cometh = "COMETH",
  UpCometh = "UP_COMETH",
  DownCometh = "DOWN_COMETH",
  LeftCometh = "LEFT_COMETH",
  RightCometh = "RIGHT_COMETH",
}

export function getEntityByValue(entityValue: string): Entity {
  let index = Object.values<string>(Entity).indexOf(entityValue);
  return Object.values(Entity)[index];
}

export default class Position {
  row: number;
  column: number;
  entity: Entity;
  constructor(row: number, column: number, entity: Entity) {
    this.row = row;
    this.column = column;
    this.entity = entity;
  }
}

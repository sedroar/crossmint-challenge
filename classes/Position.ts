export enum Entity {
  Space = "SPACE",
  POLYanet = "POLYANET",
  SOLoon = "SOLOON",
  Cometh = "COMETH",
}

export enum Color {
  Blue = "blue",
  Red = "red",
  Purple = "purple",
  White = "white",
}

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export class EntityAttribute {
  color?: Color;
  direction?: Direction;
}

export class EntityWithAttribute {
  entity!: Entity;
  entityAttribute?: EntityAttribute;
}

export default class Position {
  row!: number;
  column!: number;
  entityWithAttribute!: EntityWithAttribute;
}

export const GoalPositionsEntities: Map<string, EntityWithAttribute> = new Map([
    ["SPACE", { entity: Entity.Space }],
    ["POLYANET", { entity: Entity.POLYanet }],
    ["RED_SOLOON", { entity: Entity.SOLoon, entityAttribute: { color: Color.Red } }],
    ["BLUE_SOLOON", { entity: Entity.SOLoon, entityAttribute: { color: Color.Blue } }],
    ["PURPLE_SOLOON", { entity: Entity.SOLoon, entityAttribute: { color: Color.Purple } }],
    ["WHITE_SOLOON", { entity: Entity.SOLoon, entityAttribute: { color: Color.White } }],
    ["UP_COMETH", { entity: Entity.Cometh, entityAttribute: { direction: Direction.Up } }],
    ["DOWN_COMETH", { entity: Entity.Cometh, entityAttribute: { direction: Direction.Down } }],
    ["LEFT_COMETH", { entity: Entity.Cometh, entityAttribute: { direction: Direction.Left } }],
    ["RIGHT_COMETH", { entity: Entity.Cometh, entityAttribute: { direction: Direction.Right } }],
]);


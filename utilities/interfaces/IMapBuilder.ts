import Position from "../../classes/Position";

export default interface IMapBuilder {
    build(positions: Position[]): Promise<void>;
}
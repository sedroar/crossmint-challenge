import IMapBuilder from "./interfaces/IMapBuilder";
import Position, { Entity } from "../classes/Position";
import CrossmintChallengeApiRequest from "./CrossmintChallengeApiRequest";

export default class CrossmintChallengeMapBuilder implements IMapBuilder {
  async build(positions: Position[]): Promise<void> {
    try {
      const crossmintChallengeApiRequest = new CrossmintChallengeApiRequest(
        process.env["CROSSMINT-CANDIDATE-ID"] || ""
      );
      for (const position of positions) {
        if (position.entityWithAttribute.entity !== Entity.Space) {
          await crossmintChallengeApiRequest.post<void>(
            `${position.entityWithAttribute.entity}s`,
            {},
            {
              row: position.row,
              column: position.column,
              ...position.entityWithAttribute.entityAttribute,
            }
          );
          // added some delay to let the entity be created
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to build map");
    }
  }
}

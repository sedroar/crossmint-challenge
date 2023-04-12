import IMapBuilder from "./interfaces/IMapBuilder";
import Position, { Entity } from "../classes/Position";
import CrossmintChallengeApiRequest from "./CrossmintChallengeApiRequest";

export default class CrossmintChallengeMapBuilder implements IMapBuilder {
  async build(positions: Position[]): Promise<void> {
    try {
      const crossmintChallengeApiRequest = new CrossmintChallengeApiRequest();
      const promises = positions.map((position) => {
        if (position.entityWithAttribute.entity !== Entity.Space) {
          crossmintChallengeApiRequest.post<void>(
              `${position.entityWithAttribute.entity}s`,
              {},
              position.entityWithAttribute.entityAttribute
          );
        }
      });
      await Promise.all(promises);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to build map");
    }
  }
}

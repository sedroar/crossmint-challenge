import IMapCleaner from "./interfaces/IMapCleaner";
import CrossmintChallengeApiRequest from "./CrossmintChallengeApiRequest";
import CrossmintChallengeMap, {
  PositionEntityMap,
} from "../classes/CrossmintChallengeMap";

export default class CrossmintChallengeMapCleaner implements IMapCleaner {
  async clean(): Promise<void> {
    try {
      const crossmintChallengeApiRequest = new CrossmintChallengeApiRequest(
        process.env["CROSSMINT-CANDIDATE-ID"] || ""
      );
      const crossmintChallengeMap =
        await crossmintChallengeApiRequest.get<CrossmintChallengeMap>(
          `map/:candidateId`
        );
      let rowNumber = 0;
      let columnNumber = 0;
      for (const row of crossmintChallengeMap.map.content) {
        for (const challengeMapPosition of row) {
          if (challengeMapPosition) {
            const entity = PositionEntityMap.get(challengeMapPosition.type);
            await crossmintChallengeApiRequest.delete(
              `${entity}s`,
              {},
              { row: rowNumber, column: columnNumber }
            );
            // added some delay to let the entity be deleted
            await new Promise((resolve) => setTimeout(resolve, 700));
          }
          columnNumber++;
        }
        rowNumber++;
        columnNumber = 0;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to clean map");
    }
  }
}

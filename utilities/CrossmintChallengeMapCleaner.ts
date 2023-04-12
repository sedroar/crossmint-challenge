import IMapCleaner from "./interfaces/IMapCleaner";
import CrossmintChallengeApiRequest from "./CrossmintChallengeApiRequest";
import CrossmintChallengeMap, {
  PositionEntityMap,
} from "../classes/CrossmintChallengeMap";

export default class CrossmintChallengeMapCleaner implements IMapCleaner {
  async clean(): Promise<void> {
    const crossmintChallengeApiRequest = new CrossmintChallengeApiRequest();
    const crossmintChallengeMap =
      await crossmintChallengeApiRequest.get<CrossmintChallengeMap>(
        `map/${process.env["CROSSMINT-CANDIDATE-ID"]}`
      );
    let rowNumber = 0;
    let columnNumber = 0;
    const deletePromises = [];
    for (const row of crossmintChallengeMap.content) {
      for (const challengeMapPosition of row) {
        columnNumber++;
        deletePromises.push(
          crossmintChallengeApiRequest.delete(
            `${PositionEntityMap.get(challengeMapPosition.type)}s`,
            {},
            { row: rowNumber, column: columnNumber }
          )
        );
      }
      rowNumber++;
      columnNumber = 0;
    }
  }
}

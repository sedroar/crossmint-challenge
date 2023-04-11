import IGoalLoader from "./interfaces/IGoalLoader";
import Goal from "../classes/Goal";
import CrossmintChallengeApiGoal from "../classes/CrossmintChallengeApiGoal";
import CrossmintChallengeApiRequest from "./CrossmintChallengeApiRequest";
import Position, { getEntityByValue } from "../classes/Position";

export default class CrossmintChallengeGoalLoader implements IGoalLoader {
  async load(): Promise<Goal> {
    const crossmintChallengeApiRequest = new CrossmintChallengeApiRequest();
    const crossmintChallengeApiGoal =
      await crossmintChallengeApiRequest.request<CrossmintChallengeApiGoal>(
        `map/${process.env["CROSSMINT-CANDIDATE-ID"]}/goal`
      );
    const positions = Array<Position>();
    let rowNumber = 0;
    let columnNumber = 0;
    for (const row of crossmintChallengeApiGoal.goal) {
      for (const entity of row) {
        positions.push(
          new Position(rowNumber, columnNumber, getEntityByValue(entity))
        );
        columnNumber++;
      }
      rowNumber++;
      columnNumber = 0;
    }
    return new Goal(positions);
  }
}

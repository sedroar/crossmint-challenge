import IGoalLoader from "./interfaces/IGoalLoader";
import Goal from "../classes/Goal";
import CrossmintChallengeApiGoal from "../classes/CrossmintChallengeApiGoal";
import CrossmintChallengeApiRequest from "./CrossmintChallengeApiRequest";
import Position, { GoalPositionsEntities } from "../classes/Position";

export default class CrossmintChallengeGoalLoader implements IGoalLoader {
  async load(): Promise<Goal> {
    try {
      const crossmintChallengeApiRequest = new CrossmintChallengeApiRequest(process.env["CROSSMINT-CANDIDATE-ID"] || "");
      const crossmintChallengeApiGoal =
          await crossmintChallengeApiRequest.get<CrossmintChallengeApiGoal>(
              `map/:candidateId/goal`
          );
      const positions = Array<Position>();
      let rowNumber = 0;
      let columnNumber = 0;
      for (const row of crossmintChallengeApiGoal.goal) {
        for (const entity of row) {
          const entityWithAttribute = GoalPositionsEntities.get(entity);
          if (entityWithAttribute) {
            positions.push({
              row: rowNumber,
              column: columnNumber,
              entityWithAttribute,
            });
          } else {
            console.warn(`Unknown entity: ${entity}`)
          }
          columnNumber++;
        }
        rowNumber++;
        columnNumber = 0;
      }
      return new Goal(positions);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to load goal");
    }
  }
}

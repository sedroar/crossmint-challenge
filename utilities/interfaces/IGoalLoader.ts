import Goal from "../../classes/Goal";

export default interface IGoalLoader {
  load(): Promise<Goal>;
}

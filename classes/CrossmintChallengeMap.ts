import {Entity} from "./Position";

export const PositionEntityMap: Map<Number, String> = new Map<Number, String>(
    [
        [0, Entity.POLYanet],
        [1, Entity.SOLoon],
        [2, Entity.Cometh],
    ]
);

export class ChallengeMapPosition {
    "type"!: Number;
    color?: String;
    direction?: String;
}

export class MapContent {
    content!: ChallengeMapPosition[][];
}

export default class CrossmintChallengeMap {
    candidateId!: String;
    phase!: Number;
    map!: MapContent;
}
import ApiRequest from "./ApiRequest";

export default class CrossmintChallengeApiRequest extends ApiRequest {
  constructor() {
    super(process.env["CROSSMINT-CHALLENGE-API-BASE-URL"] || "");
  }
}
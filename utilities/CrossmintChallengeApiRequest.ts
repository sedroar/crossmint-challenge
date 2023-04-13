import ApiRequest from "./ApiRequest";

export default class CrossmintChallengeApiRequest extends ApiRequest {
  candidateId: string;
  constructor(candidateId: string) {
    super(process.env["CROSSMINT-CHALLENGE-API-BASE-URL"] || "");
    this.candidateId = candidateId;
  }

  get<TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> {
    url = url.replace(":candidateId", this.candidateId);
    return super.get(url.toLowerCase(), config);
  }

  post<TResponse>(url: string, config: RequestInit = {}, data: {} = {}): Promise<TResponse> {
    return super.post(url.toLowerCase(), config, { candidateId: this.candidateId, ...data });
  }

  delete(url: string, config: RequestInit = {}, data: {} = {}): Promise<void> {
    return super.delete(url.toLowerCase(), config, { candidateId: this.candidateId, ...data });
  }
}
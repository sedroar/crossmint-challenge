export default abstract class ApiRequest {
    protected baseUrl: string;
    // Make the `request` function generic
    // to specify the return data type:
    request<TResponse>(
        url: string,
        // `RequestInit` is a type for configuring
        // a `fetch` request. By default, an empty object.
        config: RequestInit = {}

        // This function is async, it will return a Promise:
    ): Promise<TResponse> {
        console.info(`Requesting ${this.baseUrl + url}...`);
        // Inside, we call the `fetch` function with
        // a URL and config given:
        return fetch(this.baseUrl + url, config)
            // When got a response call a `json` method on it
            .then((response) => response.json())
            // and return the result data.
            .then((data) => data as TResponse);

        // We also can use some post-response
        // data-transformations in the last `then` clause.
    }

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
}
/**
 * Created by toni on 30.08.2017.
 */
import { ApiAiRequestError } from "./Errors";
import XhrRequest from './XhrRequest';
export const DEFAULT_BASE_URL = "https://api.api.ai/v1/";


class ResetContextsRequest {
    constructor(accessToken, sessionId, contextName) {

        if (contextName != null) {
            this.uri = DEFAULT_BASE_URL + "contexts/" + contextName + "?sessionId=" + sessionId;
        } else {
            this.uri = DEFAULT_BASE_URL + "contexts?sessionId=" + sessionId;
        }

        this.headers = {
            Authorization: "Bearer " + accessToken,
            Accept: "application/json",
        };
    }
    static handleSuccess(xhr) {
        return Promise.resolve(JSON.parse(xhr.responseText));
    }
    static handleError(xhr) {
        let error = new ApiAiRequestError(null);
        try {
            const serverResponse = JSON.parse(xhr.responseText);
            if (serverResponse.status && serverResponse.status.errorDetails) {
                error = new ApiAiRequestError(serverResponse.status.errorDetails, serverResponse.status.code);
            }
            else {
                error = new ApiAiRequestError(xhr.statusText, xhr.status);
            }
        }
        catch (e) {
            error = new ApiAiRequestError(xhr.statusText, xhr.status);
        }
        return Promise.reject(error);
    }
    perform() {
        return XhrRequest.delete(this.uri, null, this.headers, {})
            .then(ResetContextsRequest.handleSuccess.bind(this))
            .catch(ResetContextsRequest.handleError.bind(this));
    }
}
export default ResetContextsRequest;
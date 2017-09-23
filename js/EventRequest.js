/**
 * Created by toni on 23.09.2017.
 */
import { ApiAiRequestError } from "api-ai-javascript/es6/Errors";
import XhrRequest from 'api-ai-javascript/es6/XhrRequest';
import {ApiAiConstants} from 'api-ai-javascript';

class EventRequest {
    constructor(accessToken, sessionId, lang, options) {
        this.options = options;
        this.uri = ApiAiConstants.DEFAULT_BASE_URL + "query?v=" + ApiAiConstants.DEFAULT_API_VERSION;
        this.requestMethod = XhrRequest.Method.POST;
        this.headers = {
            Authorization: "Bearer " + accessToken,
        };
        this.options.lang = lang;
        this.options.sessionId = sessionId;
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
    perform(overrideOptions = null) {
        const options = overrideOptions ? overrideOptions : this.options;
        return XhrRequest.ajax(this.requestMethod, this.uri, options, this.headers)
            .then(EventRequest.handleSuccess.bind(this))
            .catch(EventRequest.handleError.bind(this));
    }
}
export default EventRequest;
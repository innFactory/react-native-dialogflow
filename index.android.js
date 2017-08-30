'use strict';

import { NativeModules } from 'react-native';
import ResetContextsRequest from './js/ResetContextsRequest';

let ApiAi = NativeModules.ApiAi;

ApiAi.setContexts = (contexts) => {
    ApiAi.setContextsAsJson(JSON.stringify(contexts))
};

ApiAi.resetContexts = async (onResult: ()=>{}, onError: ()=>{}) => {
    const accessToken = await ApiAi.getAccessToken();
    const sessionId = await ApiAi.getSessionId();
    let request = new ResetContextsRequest(accessToken, sessionId, null);
    request.perform().then(res=>onResult(res)).catch(err=>onError(err));
};

ApiAi.setEntities = (entities) => {
    ApiAi.setEntitiesAsJson(JSON.stringify(entities))
};

module.exports = ApiAi;
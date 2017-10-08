'use strict';

import { NativeModules } from 'react-native';
import EventRequest from './js/ResetContextsRequest';

let ApiAi = NativeModules.ApiAi;

ApiAi.setContexts = (contexts) => {
    ApiAi.setContextsAsJson(JSON.stringify(contexts))
};

ApiAi.setPermanentContexts = (contexts) => {

    // set lifespan to 1 if it's not set
    contexts.forEach((c,i,a)=>{
        if (!c.lifespan) {
            a[i] = {...c, lifespan: 1};
        }
    });

    ApiAi.setPermanentContextsAsJson(JSON.stringify(contexts))
};

ApiAi.resetContexts = async (onResult: ()=>{}, onError: ()=>{}) => {
    ApiAi.setContextsAsJson({});

    const accessToken = await ApiAi.getAccessToken();
    const sessionId = await ApiAi.getSessionId();
    let request = new ResetContextsRequest(accessToken, sessionId, null);
    request.perform().then(res=>onResult(res)).catch(err=>onError(err));
};

ApiAi.setEntities = (entities) => {
    ApiAi.setEntitiesAsJson(JSON.stringify(entities))
};

ApiAi.requestEvent = async (eventName: string, eventData: {}, onResult: ()=>{}, onError: ()=>{}) => {

    const accessToken = await ApiAi.getAccessToken();
    const sessionId = await ApiAi.getSessionId();
    const languageTag = await ApiAi.getLanguage();
    let request = new EventRequest(accessToken, sessionId, languageTag, {event: {name: eventName, data: eventData}});
    request.perform().then(res=>onResult(res)).catch(err=>onError(err));
}

module.exports = ApiAi;
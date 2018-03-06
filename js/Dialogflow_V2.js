'use strict';

import { NativeModules, NativeAppEventEmitter } from 'react-native';
import requestEvent from './ResetContextsRequest';
import ResetContextsRequest from './ResetContextsRequest';
export const DEFAULT_BASE_URL = "https://dialogflow.googleapis.com/v2beta1/projects/";
export const lol = "testv2-3b5ca/agent/sessions/0:detectIntent";

export class Dialogflow_V2 {

    onListeningStarted(callback) {
        callback();
    }

    onListeningCanceled(callback) {
        callback();
    }

    onListeningFinished(callback) {
        callback();
    }

    setContexts(contexts) {
        this.contexts = contexts;

        contexts.forEach(c => {
            this.createContext(c);
        })
    }

    setPermanentContexts(contexts) {
        // set lifespan to 1 if it's not set
        contexts.forEach((c, i, a) => {
            if (!c.lifespanCount) {
                a[i] = { ...c, lifespanCount: 1 };
            }
        });

        this.permanentContexts = contexts;
    }

    setEntities(entities) {
        this.entities = entities;
    }

    onAudioLevel(callback) {

    }

    requestEvent = async (eventName, eventParameters, onResult, onError) => {

        /*
        this.permanentContexts.forEach(c => {
            this.createContext(c);
        })
        */

        const data = {
            "queryParams": {
                "contexts": this.mergeContexts(this.contexts, this.permanentContexts),
                "sessionEntityTypes": []
            },
            "queryInput": {
                "event": {
                    "name": eventName,
                    "parameters": eventParameters,
                    "languageCode": this.languageTag,
                },
            }
        }

        this.contexts = null;
        this.entities = null;

        fetch(DEFAULT_BASE_URL + this.projectId + "/agent/sessions/" + this.sessionId + ":detectIntent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken,
                'charset': "utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                var json = response.json().then(onResult)
            })
            .catch(onError);
    };


    requestQuery = async (query, onResult, onError) => {

        /*
        this.permanentContexts.forEach(c => {
            this.createContext(c);
        })
        */

        const data = {
            "queryParams": {
                "contexts": this.mergeContexts(this.contexts, this.permanentContexts),
                "sessionEntityTypes": []
            },
            "queryInput": {
                "text": {
                    "text": query,
                    "languageCode": this.languageTag,
                },
            }
        }

        this.contexts = null;
        this.entities = null;

        fetch(DEFAULT_BASE_URL + this.projectId + "/agent/sessions/" + this.sessionId + ":detectIntent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken,
                'charset': "utf-8"
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                var json = response.json().then(onResult)
            })
            .catch(onError);
    };

    /**
   * https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/projects.agent.sessions.contexts
   * 
   * @param {*} context 
   */
    createContext = async (context) => {

        const data = context;

        try {
            const response = await fetch(DEFAULT_BASE_URL + this.projectId + "/agent/sessions/" + this.sessionId + "/contexts:create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.accessToken,
                    'charset': "utf-8"
                },
                body: JSON.stringify(data)
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };


    mergeContexts(context1, context2) {
        if (!context1) {
            return context2;
        } else if (!context2) {
            return context1;
        } else {
            return [...context1, ...context2];
        }
    }

    resetContexts(onResult, onError) {
        let request = new ResetContextsRequest(this.client.getAccessToken(), this.client.getSessionId(), null);
        request.perform().then(res => onResult(res)).catch(err => onError(err));
    };

    /**
     * generates new random UUID
     * @returns {string}
     */
    guid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    }


    LANG_CHINESE_CHINA = "zh-CN";
    LANG_CHINESE_HONGKONG = "zh-HK";
    LANG_CHINESE_TAIWAN = "zh-TW";
    LANG_DUTCH = "nl";
    LANG_ENGLISH = "en";
    LANG_ENGLISH_GB = "en-GB";
    LANG_ENGLISH_US = "en-US";
    LANG_FRENCH = "fr";
    LANG_GERMAN = "de";
    LANG_ITALIAN = "it";
    LANG_JAPANESE = "ja";
    LANG_KOREAN = "ko";
    LANG_PORTUGUESE = "pt";
    LANG_PORTUGUESE_BRAZIL = "pt-BR";
    LANG_RUSSIAN = "ru";
    LANG_SPANISH = "es";
    LANG_UKRAINIAN = "uk";
}


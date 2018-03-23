'use strict';

import { NativeModules, NativeAppEventEmitter } from 'react-native';
import requestEvent from './ResetContextsRequest';
import ResetContextsRequest from './ResetContextsRequest';
export const DEFAULT_BASE_URL = "https://api.api.ai/v1/";
export const DEFAULT_API_VERSION = "20150910";

export class Dialogflow {

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
    }

    setPermanentContexts(contexts) {
        // set lifespan to 1 if it's not set
        contexts.forEach((c, i, a) => {
            if (!c.lifespan) {
                a[i] = { ...c, lifespan: 1 };
            }
        });

        this.permanentContexts = contexts;
    }

    setEntities(entities) {
        this.entities = entities;
    }

    onAudioLevel(callback) {

    }

    requestEvent = async (eventName, eventData, onResult, onError) => {

        const data = {
            "event": {
                "name": eventName,
                "data": {
                    ...eventData
                }
            },
            'lang': this.languageTag,
            "sessionId": this.sessionId
        };

        fetch(DEFAULT_BASE_URL + "query?v=" + DEFAULT_API_VERSION, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
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

        const data = {
            "contexts": this.mergeContexts(this.contexts, this.permanentContexts),
            "query": query,
            'lang': this.languageTag,
            "sessionId": this.sessionId.toString()
        };

        this.contexts = null;
        this.entities = null;

        fetch(DEFAULT_BASE_URL + "query?v=" + DEFAULT_API_VERSION, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
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
        let request = new ResetContextsRequest(this.accessToken, this.sessionId, null);
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


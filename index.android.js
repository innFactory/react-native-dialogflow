'use strict';

import { NativeAppEventEmitter } from 'react-native';
import Voice from './js/RCTVoice';
import { Dialogflow } from './js/Dialogflow';


var dialogflow = new Dialogflow();

dialogflow.setConfiguration = function (accessToken, languageTag) {
    dialogflow.accessToken = accessToken;
    dialogflow.languageTag = languageTag;
    dialogflow.sessionId = dialogflow.sessionId ? dialogflow.sessionId : dialogflow.guid();

    Voice.onSpeechStart = () => (c) => dialogflow.onListeningStarted(c);
    Voice.onSpeechEnd = () => (c) => dialogflow.onListeningFinished(c);
}

dialogflow.startListening = function (onResult, onError) {

    dialogflow.subscription = NativeAppEventEmitter.addListener(
        'onSpeechResults',
        (result) => {
            if (result.value) {
                dialogflow.requestQuery(result.value[0], onResult, onError);
            }

        }
    );

    Voice.start(dialogflow.languageTag);
}

dialogflow.finishListening = function () {
    Voice.stop();
}

export default dialogflow;

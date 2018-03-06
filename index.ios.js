
import { NativeModules, NativeAppEventEmitter } from 'react-native';
import ResetContextsRequest from './js/ResetContextsRequest';

import { Dialogflow } from './js/Dialogflow';
var SpeechToText = NativeModules.RNSpeechToTextIos;

var dialogflow = new Dialogflow();

dialogflow.setConfiguration = function (accessToken, languageTag) {
    dialogflow.language = languageTag;
    dialogflow.accessToken = accessToken;
    dialogflow.languageTag = languageTag;
}


dialogflow.startListening = function (onResult, onError) {

    this.subscription = NativeAppEventEmitter.addListener(
        'SpeechToText',
        (result) => {

            if (result.error) {
                onError(result.error);
            } else {
                if (result.isFinal) {
                    this.requestQuery(result.bestTranscription.formattedString, onResult, onError);
                }

            }

        }
    );

    SpeechToText.startRecognition(this.language);
}

dialogflow.finishListening = function () {
    SpeechToText.finishRecognition();
}

export default dialogflow;

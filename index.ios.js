
import { NativeAppEventEmitter, NativeModules } from 'react-native';
import { Dialogflow } from './js/Dialogflow';
import { Dialogflow_V2 } from './js/Dialogflow_V2';

var SpeechToText = NativeModules.RNSpeechToTextIos;

/**
 *  DIALOGFLOW V1
 */
var dialogflow = new Dialogflow();

dialogflow.setConfiguration = function (accessToken, languageTag) {
    dialogflow.accessToken = accessToken;
    dialogflow.languageTag = languageTag;
    dialogflow.sessionId = dialogflow.sessionId ? dialogflow.sessionId : dialogflow.guid();
}


dialogflow.startListening = function (onResult, onError, onUpdate) {

    this.subscription = NativeAppEventEmitter.addListener(
        'SpeechToText',
        (result) => {

            if (result.error) {
                onError(result.error);
            }
            else if (result.isFinal) {
                this.requestQuery(result.bestTranscription.formattedString, onResult, onError);
            }
            else if (onUpdate) {
                onUpdate(result.bestTranscription.formattedString);
            }
        }
    );

    SpeechToText.startRecognition(this.language);
}

dialogflow.finishListening = function () {
    SpeechToText.finishRecognition();
}

export default dialogflow;



/**
 * DIALOGFLOW V2
 */
var dialogflow2 = new Dialogflow_V2();

dialogflow2.setConfiguration = async function (clientEmail, privateKey, languageTag, projectId) {
    dialogflow2.accessToken = await dialogflow2.generateAccessToken(clientEmail, privateKey);
    dialogflow2.languageTag = languageTag;
    dialogflow2.projectId = projectId;
    dialogflow2.sessionId = dialogflow2.sessionId ? dialogflow2.sessionId : dialogflow2.guid();
}

dialogflow2.startListening = function (onResult, onError, onUpdate) {

    dialogflow2.subscription = NativeAppEventEmitter.addListener(
        'SpeechToText',
        (result) => {

            if (result.error) {
                onError(result.error);
            }
            else if (result.isFinal) {
                dialogflow2.requestQuery(result.bestTranscription.formattedString, onResult, onError);
            }
            else if (onUpdate) {
                onUpdate(result.bestTranscription.formattedString);
            }

        }
    );

    SpeechToText.startRecognition(dialogflow2.language);
}

dialogflow2.finishListening = function () {
    SpeechToText.finishRecognition();
}

export { dialogflow2 as Dialogflow_V2 };


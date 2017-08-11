
import { NativeModules, NativeAppEventEmitter } from 'react-native';
import {ApiAiClient} from 'api-ai-javascript';

var SpeechToText = NativeModules.RNSpeechToTextIos;

class ApiAi {


  setConfiguration(clientAccessToken: String, languageTag: String) {
    this.language = languageTag;
    this.client = new ApiAiClient({accessToken: clientAccessToken, apiLang: languageTag});
  }

  onListeningStarted(callback: ()=>{}) {

  }

  onListeningCanceled(callback: ()=>{}) {

  }

  onListeningFinished(callback: ()=>{}) {

  }

  startListening(onResult: ()=>{}, onError: ()=>{}) {

    this.subscription = NativeAppEventEmitter.addListener(
      'SpeechToText',
      (result) => {

        console.log(result);

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

  finishListening() {
    SpeechToText.finishRecognition();
  }

    setContexts(contexts) {
        this.contexts = contexts;
    }

    requestQuery(query: String, onResult: ()=>{}, onError: ()=>{}) {
        if (this.contexts) {
            this.client.textRequest(query, {contexts: this.contexts}).then(res=>onResult(res)).catch(err=>onError(err));
            this.contexts = null;
        } else {
            this.client.textRequest(query).then(res=>onResult(res)).catch(err=>onError(err));
        }
    }

  onAudioLevel(callback) {

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

export default new ApiAi();

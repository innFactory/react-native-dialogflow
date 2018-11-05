# react-native-dialogflow (react-native-api-ai)

[![Build Status](https://travis-ci.org/innFactory/react-native-dialogflow.svg?branch=master)](https://www.npmjs.com/package/react-native-dialogflow)
[![Version](https://img.shields.io/npm/v/react-native-dialogflow.svg)](https://www.npmjs.com/package/react-native-dialogflow)
[![Downloads](https://img.shields.io/npm/dt/react-native-dialogflow.svg)](https://www.npmjs.com/package/react-native-dialogflow)


A React-Native Bridge for the Google Dialogflow AI SDK.

<img src="header_img.png" alt="Header Image"/>

Support for iOS 10+ and Android!

[Dialogflow](https://dialogflow.com/) is a powerful tool for building delightful and natural conversational experiences. You can build chat and speech bots and may intergrate it in a lot of platform like twitter, facebook, slack, or alexa.

## Install

This package depends on react-native-voice, follow their readme to setup it.

Add react-native-dialogflow and link it:
```
npm install --save react-native-dialogflow react-native-voice

react-native link react-native-dialogflow
react-native link react-native-voice

```

### iOS: IMPORTANT xCode plist settings

Also, you need open the React Native xCode project and add two new keys into `Info.plist`
Just right click on `Info.plist` -> `Open As` -> `Source Code` and paste these strings somewhere into root `<dict>` tag

```xml
<key>NSSpeechRecognitionUsageDescription</key>
<string>Your usage description here</string>
<key>NSMicrophoneUsageDescription</key>
<string>Your usage description here</string>
```

Application will crash if you don't do this.

## Usage
Import Dialogflow:
```javascript
import Dialogflow from "react-native-dialogflow";
```
or for V2
```javascript
import { Dialogflow_V2 } from "react-native-dialogflow"
```

### Configuration
Set the `accessToken` and the language in your constructor:
```javascript
 constructor(props) {
        super(props);

        Dialogflow.setConfiguration(
          "4xxxxxxxe90xxxxxxxxc372", Dialogflow.LANG_GERMAN
        );
    }

```

For V2 you can set the `client_email` and `private_key` of the credential json [auth setup](https://dialogflow.com/docs/reference/v2-auth-setup). In addition you have to set your projectId:
```javascript
 constructor(props) {
        super(props);

        Dialogflow_V2.setConfiguration(
            "your-dialogflow-project@asdf-76866.iam.gserviceaccount.com",
            '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADAN...1oqO\n-----END PRIVATE KEY-----\n',
            Dialogflow_V2.LANG_GERMAN,
            'testv2-3b5ca'
        );
    }

```


### Listening
Start listening with integrated speech recognition:
```javascript
   <Button onPress={() => {
            Dialogflow.startListening(result=>{
                console.log(result);
            }, error=>{
                console.log(error);
            });
        }}
   />
```
In iOS only you have to call `finishListening()`. Android detects the end of your speech automatically. That's the reason why we didn't implement the finish method in Android.
```javascript
// only for iOS
Dialogflow.finishListening();
// after this call your callbacks from the startListening will be executed.
```

### Text Request
For using your own speech recognition:
```javascript
   <Button onPress={() => {
           Dialogflow.requestQuery("Some text for your Dialogflow agent", result=>console.log(result), error=>console.log(error));
        }}
   />
```

### Request an Event
For sending an [event](https://api.ai/docs/events) to Dialogflow _(Contexts and Entities have no effect!)_:
```javascript
Dialogflow.requestEvent(
    "WELCOME",
    {param1: "yo mr. white!"},
    result=>{console.log(result);},
    error=>{console.log(error);}
);
```


### Contexts
Set [contexts](https://api.ai/docs/reference/agent/contexts) (will take affect on next startListening or queryRequest):
```javascript
const contexts = [{
  name: "deals",
  lifespan: 1,
  parameters: {
      Shop: "Rewe"
  }
}];

Dialogflow.setContexts(contexts);
```

Reset all (non-permantent) contexts for current session:
```javascript
Dialogflow.resetContexts(result=>{
       console.log(result);
    }, error=>{
       console.log(error);
    });
```

Set permanent contexts, which will be set automatically before every request. This is useful for e.g. access tokens in webhooks:
```javascript
const permanentContexts = [{
  name: "Auth",
  // lifespan 1 is set automatically, but it's overrideable
  parameters: {
      AccessToken: "1234yo1234"
  }
}];

Dialogflow.setPermanentContexts(permanentContexts);
```

### Entities
Set [UserEntities](https://api.ai/docs/reference/agent/userentities) (will take affect on next startListening or queryRequest):
```javascript
const entities = [{
  "name":"shop",
  "extend":true,
  "entries":[
      {
          "value":"Media Markt",
          "synonyms":["Media Markt"]
      }
  ]
 }];

 Dialogflow.setEntities(entities);
```


### Listener for Android
Only in Android we have four additional methods: `onListeningStarted`, `onListeningCanceled`, `onListeningFinished` and `onAudioLevel`. In iOS they will be never called:
```javascript
   <Button onPress={() => {

            Dialogflow.onListeningStarted(()=>{
                console.log("listening started");
            });

            Dialogflow.onListeningCanceled(()=>{
                console.log("listening canceled");
            });

            Dialogflow.onListeningFinished(()=>{
                console.log("listening finished");
            });

            Dialogflow.onAudioLevel(level=>{
                console.log(level);
            });


            Dialogflow.startListening(result=>{
                console.log(result);
            }, error=>{
                console.log(error);
            });
        }}
   />
```
Note: Make sure you are setting the callbacks before startListening every single time again. Don't set the callbacks in e.g. constructor or componentsDidMount if you are executing startListening more than one times.


## Supported Languages
Set the language in your configuration:
```javascript
Dialogflow.setConfiguration("4xxxxxxxe90xxxxxxxxc372", Dialogflow.LANG_GERMAN);
```
* LANG_CHINESE_CHINA
* LANG_CHINESE_HONGKONG
* LANG_CHINESE_TAIWAN
* LANG_DUTCH
* LANG_ENGLISH
* LANG_ENGLISH_GB
* LANG_ENGLISH_US
* LANG_FRENCH
* LANG_GERMAN
* LANG_ITALIAN
* LANG_JAPANESE
* LANG_KOREAN
* LANG_PORTUGUESE
* LANG_PORTUGUESE_BRAZIL
* LANG_RUSSIAN
* LANG_SPANISH
* LANG_UKRAINIAN

## Methods
| name                  | platform | param1    | param2    | param3    | param4    |
| --------------------- | -------- | --------- | --------- | --------- | --------- |
| `setConfiguration` (V1)   | both     | accessToken: String | languageTag: String  |
| `setConfiguration` (V2)    | both     | client_email: String | private_key: String | languageTag: String | projectId: String |
| `startListening`      | both     | resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{}  | |
| `finishListening`     | ios      |  |   | |
| `requestQuery`        | both     | query: String |  resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{}   |
| `requestEvent`        | both     | eventName: String | eventData: Object | resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{}   |
| `onListeningStarted`  | both  | callback: ()=>{}    | | |
| `onListeningCanceled` | none  | callback: ()=>{}    || |
| `onListeningFinished` | both  | callback: ()=>{}    | | |
| `onAudioLevel`        | android  | callback: (level: number)=>{}    || |
| `setContexts`         | both     | array    || |
| `resetContexts`       | both     | resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{} | |
| `setPermanentContexts`| both     | array    || |
| `setEntities` (V1 only)| both     | array    || |


## Blogpost

### Deutsch
[Sprachsteuerung mit Api.ai in einer React-Native App](https://innfactory.de/de/blog/34-software-engineering/65-sprachsteuerung-mit-api-ai-in-einer-react-native-app)
### English

## Contributors

* [Anton Spöck](https://github.com/spoeck)
* [Tobias Jonas](https://github.com/jona7o)
* [Maximilian Grassl](https://github.com/innGrassl)

Powered by [innFactory](https://innfactory.de/)

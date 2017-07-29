# react-native-api-ai

[![Build Status](https://travis-ci.org/innFactory/react-native-api-ai.svg?branch=master)](https://www.npmjs.com/package/react-native-api-ai)
[![Version](https://img.shields.io/npm/v/react-native-api-ai.svg)](https://www.npmjs.com/package/react-native-api-ai)
[![Downloads](https://img.shields.io/npm/dt/react-native-api-ai.svg)](https://www.npmjs.com/package/react-native-api-ai)

A React-Native Bridge for the Google API AI SDK

Currently we are supporting android only. The support for ios will be released the next days.


## Install

Add react-native-api-ai and link it:
```
npm install --save react-native-api-ai

react-native link react-native-api-ai
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
Import ApiAi:
```javascript
import ApiAi from "react-native-api-ai";
```

Set the `clientAccessToken` and the language in your constructor:
```javascript
 constructor(props) {
        super(props);

        ApiAi.setConfiguration(
          "4xxxxxxxe90xxxxxxxxc372", ApiAi.LANG_GERMAN
        );
    }

```

Start listening with integrated speech recognition:
```javascript
   <Button onPress={() => {
            ApiAi.startListening(result=>{
                console.log(result);
            }, error=>{
                console.log(error);
            });
        }}
   />
```
In iOS only you have to call `finishListening()`. Android detects the end of your speech automatically. That's the reason why didn't implemented the finish method in Android.
```javascript
// only for iOS
ApiAi.finishListening();
// after this call your callbacks from the startListening will be executed.
```

Only in Android we have four additional methods: `onListeningStarted`, `onListeningCanceled`, `onListeningFinished` and `onAudioLevel`. In iOS they will be never called:
```javascript
   <Button onPress={() => {

            ApiAi.onListeningStarted(()=>{
                console.log("listening started");
            });

            ApiAi.onListeningCanceled(()=>{
                console.log("listening canceled");
            });

            ApiAi.onListeningFinished(()=>{
                console.log("listening finished");
            });

            ApiAi.onAudioLevel(level=>{
                console.log(level);
            });


            ApiAi.startListening(result=>{
                console.log(result);
            }, error=>{
                console.log(error);
            });
        }}
   />
```
Note: Make sure you are setting the callbacks before startListening every single time again. Don't set the callbacks in e.g. constructor or componentsDidMount if you are executing startListening more than one times.

Using your own speech recognition:
```javascript
   <Button onPress={() => {
           ApiAi.requestQuery("Some text for your api-ai agent", result=>console.log(result), error=>console.log(error));
        }}
   />
```

## Supported Languages
Set the language in your configuration:
```javascript
ApiAi.setConfiguration("4xxxxxxxe90xxxxxxxxc372", ApiAi.LANG_GERMAN);
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
| name                  | platform | param1    | param2    | param3    |
| --------------------- | --------- | --------- | --------- |
| `setConfiguration`    | both | clientAccessToken: String | languageTag: String | |
| `startListening`      | both | resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{}  | |
| `finishListening`      | ios |  |   | |
| `requestQuery`           | both | query: String |  resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{}   |
| `onListeningStarted`            | android | callback: ()=>{}    | | |
| `onListeningCanceled`            | android | callback: ()=>{}    || |
| `onListeningFinished`            | android | callback: ()=>{}    | | |
| `onAudioLevel`            | android | callback: (level: number)=>{}    || |


## Contributors

[Anton Spöck](https://github.com/spoeck)

Powered by [innFactory](https://innfactory.de/)

# react-native-api-ai
A React-Native Bridge for the Google API AI SDK

Currently we are supporting android only. The support for ios will be released the next days.


## Install

Add react-native-api-ai and link it:
```
npm install --save react-native-api-ai

react-native link react-native-api-ai
```


## Usage
Import ApiAi:
```javascript
import ApiAi from "react-native-api-ai";
```

Set the `clientAccessToken` and the language in your contructor:
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

Usage of `onListeningStarted`, `onListeningCanceled`, `onListeningFinished` and `onAudioLevel`:
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
Note: Make sure you are setting the callbacks before startListening again every single time. Don't set in e.g. constructor or componentsDidMount if you are executing startListening more than one times.

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
| name                  | param1    | param2    | param3    |
| --------------------- | --------- | --------- | --------- |
| `setConfiguration`    | clientAccessToken: String | languageTag: String | |
| `startListening`      | resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{}  | |
| `requestQuery`           | query: String |  resultCallback: (result: object)=>{} | errorCallback: (error: object)=>{}   |
| `onListeningStarted`            | callback: ()=>{}    | | |
| `onListeningCanceled`            | callback: ()=>{}    || |
| `onListeningFinished`            | callback: ()=>{}    | | |
| `onAudioLevel`            | callback: (level: number)=>{}    || |
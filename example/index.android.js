
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Dialogflow from "react-native-dialogflow"

export default class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          result: "",
          listeningState: "not started",
          audioLevel: 0,
      };


      Dialogflow.setConfiguration(
          "57b6ce865e6e4b138a74a88cfd8bc526", Dialogflow.LANG_GERMAN
      );



      const contexts = [{
          "name": "deals",
          "lifespan": 1,
          "parameters": {
              "name": "Sam"
          }
      }];

      Dialogflow.setContexts(contexts);


      const permanentContexts = [{
          "name": "config",
          "parameters": {
              "access_token": "42 yo 42 tiny rick"
          }
      }];

      Dialogflow.setPermanentContexts(permanentContexts);


      const entities = [{
          "name":"shop",
          "extend":true,
          "entries":[
              {
                  "value":"Media Markt",
                  "synonyms":[
                      "Media Markt",
                  ]
              }
          ]
      }];


      Dialogflow.setEntities(entities);
  }


  render() {
      Dialogflow.requestEvent("WELCOME", null, r=>console.log(r), e=>console.log(e));


      return (
          <View style={styles.container}>

              <View style={{flex: 4}}>
                  <Text>{"Listening State: " + this.state.listeningState}</Text>
                  <Text>{"Audio Level: " + this.state.audioLevel}</Text>
                  <Text>{"Result: " + this.state.result}</Text>
              </View>
              <View style={{flex: 1, padding: 10}}>
                  <Button title="Start Listening" onPress={() => {


                      Dialogflow.onListeningStarted(() => {
                          this.setState({listeningState: "started"});
                      });

                      Dialogflow.onListeningCanceled(() => {
                          this.setState({listeningState: "canceled"});
                      });

                      Dialogflow.onListeningFinished(() => {
                          this.setState({listeningState: "finished"});
                      });

                      Dialogflow.onAudioLevel(level => {
                          this.setState({audioLevel: level});
                      });

                      Dialogflow.startListening(result => {
						  console.log(result);
                          this.setState({result: JSON.stringify(result)});
                      }, error => {
                          this.setState({result: JSON.stringify(error)});
                      });

                  }}/>
              </View>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('DialogflowExample', () => App);

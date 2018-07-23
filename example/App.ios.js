import React, { Component } from 'react';
import { AppRegistry, Button, StyleSheet, Text, View } from 'react-native';
import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow";


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      listeningState: "not started",
      audioLevel: 0,
      buttonText1: "Start Listening",
      buttonText2: "Start Listening V2",
      listening1: false,
      listening2: false
    };


    Dialogflow.setConfiguration(
      "3242_your_token_2344454", Dialogflow.LANG_GERMAN
    );

    Dialogflow_V2.setConfiguration(
      "react-access@laura-63528.iam.gserviceaccount.com",
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTQw/Lpj+nPiBQ\ncpecBK1SRSfUTqj5xnhbXhhI8q3NVrxkzBzkZivEBT5UlbtPFf1h0aaRM5twRz5J\nI8n6VlitXgZTpS06ls8z2nXc/2u9JbZIjY+ciZJN01FfATk8Mamply1mzN1XTCX8\nydDjYhqLfELwgZpI8cfWM+tiPK4tPcMCRF11u/rd8TDEy2Kf8W7lUhygv77gshu8\ndmCE1nS0ucA0H0Rhou4s7l485SWuqe4Dwar6Q6v7K4GqgnLcx2nwiQtuuefUXzzw\nWbt/5ExBjpGyDylZX0rUw80FfDSTrlWnb6B/wsf6J4FOt/yW+Zz4QuJF+KbYbG89\nVlNBYD7pAgMBAAECggEAYA6Zc4DrZ1k1qy53Ze6wefxMwFlltnA6EF0n0J9bTEa4\nUWKHbohQNQgnT6FnMe3vMFd5k4LyFaqnFO1rbGJvXqCmYsjzWDTzEIIv3iTa8X1g\ntPt8xXG97pn7YSW2xvpTyPMepyPWLlfG2/pNet4D8NE2xJFBPBKHSQuBZsDtd07O\nd2Bh06gP8+KhsQ7gjIVvBei3DoMAXCrw9RXfY2GdnNJtLgSd35FShpxP8Mn2+KSx\nHwJZVewkEH9YFhvqLb7GWV9330FJ5oqlq5HZiKGYpkXfYA01nD/s7GcRqYUb3ddR\noXlD7JsJZ8E2iowmG7Q865WKPH+ysBJ92d0aRsWgIwKBgQD2Bp4F23/x6AR4vdGY\nfn+5dGBG40zXFB534ydR1mgVrySYUQUf35ri3RDPObTjBQNOz1b+zOnB4AoimewN\nNQEUjiTt94sn2EZg3aOK86P5tILdKxAJxBlXAvVCUz+RpFotDqy7bckcOiSszSFq\nLjvC5qlj2z/DhpvHluESjHoYBwKBgQDb06WcNubPnJPCDSXW1VczYxtUdc2rvfX1\nhgvDlKUlzlii4Hqz1tYOcsJkskmcPZHm/5G2KXJhwaa1Mu0EnkTnitkLq+4hkUex\nHs7EiG1YficpLm5Mb++xUEM7t9PJwzME1pvsJWMWTVqkDghlw0Z4P5nC/X32+Ts5\nGh2AsZnVjwKBgDM9A5Iyub3W1X+UAN/ikJU+MILy+eDdVs8fJuQ7ZCgH9vYmAYw2\n1Jok8khGO28Ab0Ttl6+vW4u+Lj4wkmHZxSTTycspv/iHaXjpEBNzVJY/yvVm74sp\nJSHjAtNSZS3e7czufnj2j2jqjxLSEgB8KoQX5/VdBzWghjcWLD/hs9fnAoGBAMl/\nyplTteRuSP6iIKI5MlJXMRENXrZjTNZ+xb/EPFFYQOUj0TWR4uqhhNDaoCDISzor\n37vTaBZ1dMM5aAtIrC51lphdQ82fJtETRULfLyPjly/ncJE+Nb8ZrFdMHKUf+V8g\n/RHL/3TM+R3SAx6Mjcbhvab/x3wgXonsB0kVAsa/AoGAdmVqyBsVz4V0OBGMW/xt\nIpcpktwDzvDQHHE0trZJaF9CQnxUQzM6D/RqC6rDjMORAMaApx3jcOAJITwP9xXc\nS5r104LVYw0Whj+9JBPfmzTXdd2BzoCXDFQoeYwLtS69LoHSNjrQ5+nOU3cGquin\n40y3aAFL6WlPXIlE9M/7M2E=\n-----END PRIVATE KEY-----\n',
      Dialogflow_V2.LANG_GERMAN,
      'laura-63528'
    );



    const contexts = [{
      "name": "deals",
      "lifespan": 1,
      "parameters": {
        "name": "Sam"
      }
    }];



    Dialogflow.setContexts(contexts);
    Dialogflow_V2.setContexts(contexts);


    const permanentContexts = [{
      "name": "config",
      "parameters": {
        "access_token": "42 yo 42 tiny rick"
      }
    }];


    Dialogflow.setPermanentContexts(permanentContexts);
    Dialogflow_V2.setPermanentContexts(permanentContexts);


    const entities = [{
      "name": "shop",
      "extend": true,
      "entries": [
        {
          "value": "Media Markt",
          "synonyms": [
            "Media Markt",
          ]
        }
      ]
    }];


    Dialogflow.setEntities(entities);
    // Dialogflow_V2.setEntities(entities);
  }


  render() {
    Dialogflow.requestEvent("WELCOME", null, r => console.log(r), e => console.log(e));
    Dialogflow_V2.requestEvent("WELCOME", null, r => console.log(r), e => console.log(e));


    return (
      <View style={styles.container}>

        <View style={{ flex: 4 }}>
          <Text>{"Listening State: " + this.state.listeningState}</Text>
          <Text>{"Audio Level: " + this.state.audioLevel}</Text>
          <Text>{"Result: " + this.state.result}</Text>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Button title={this.state.buttonText1} onPress={() => {


            if (this.state.listening1) {
              Dialogflow.finishListening();
              this.setState({ buttonText1: "Start Listening", listening1: false })
            } else {
              Dialogflow.startListening(result => {
                this.setState({ result: JSON.stringify(result) });
              }, error => {
                this.setState({ result: JSON.stringify(error) });
              });
              this.setState({ buttonText1: "Stop Listening", listening1: true })
            }

            // V1
            Dialogflow.onListeningStarted(() => {
              this.setState({ listeningState: "started" });
            });

            Dialogflow.onListeningCanceled(() => {
              this.setState({ listeningState: "canceled" });
            });

            Dialogflow.onListeningFinished(() => {
              this.setState({ listeningState: "finished" });
            });

          }} />

          <Button color="orange" title={this.state.buttonText2} onPress={() => {
            // V2 
            if (this.state.listening2) {
              Dialogflow_V2.finishListening();
              this.setState({ buttonText2: "Start Listening V2", listening2: false })
            } else {
              Dialogflow_V2.startListening(result => {
                this.setState({ result: JSON.stringify(result) });
              }, error => {
                this.setState({ result: JSON.stringify(error) });
              });
              this.setState({ buttonText2: "Stop Listening V2", listening2: true })
            }

            Dialogflow_V2.onListeningStarted(() => {
              this.setState({ listeningState: "started" });
            });

            Dialogflow_V2.onListeningCanceled(() => {
              this.setState({ listeningState: "canceled" });
            });

            Dialogflow_V2.onListeningFinished(() => {
              this.setState({ listeningState: "finished" });
            });

          }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('ApiAiExample', () => App);
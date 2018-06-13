import React, { Component } from 'react';
import { AppRegistry, Button, StyleSheet, Text, View } from 'react-native';
import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            buttonText1: "Start Listening",
            buttonText2: "Start Listening V2",
            listening1: false,
            listening2: false
        };


        Dialogflow.setConfiguration(
            "3242_your_token_2344454", Dialogflow.LANG_GERMAN
        );

        Dialogflow_V2.setConfiguration(
            "reasdfsdfdf@asdf-76866.iam.gserviceaccount.com",
            '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADAN...1oqO\n-----END PRIVATE KEY-----\n',
            Dialogflow_V2.LANG_GERMAN,
            'testv2-3b5ca'
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
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 4 }}>
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
                    }} />
                </View>
                <View style={{ flex: 1, marginBottom: 20 }}>
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
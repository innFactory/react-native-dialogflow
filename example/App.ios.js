import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import ApiAi from "react-native-dialogflow"

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            buttonText: "Start Listening",
            listening: false
        };

        console.log(ApiAi);

        ApiAi.setConfiguration(
            "INSERT_YOUR_CLENT_ACCESS_TOKEN_HERE", ApiAi.LANG_GERMAN
        );
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 4 }}>
                    <Text>{"Result: " + this.state.result}</Text>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                    <Button title={this.state.buttonText} onPress={() => {

                        if (this.state.listening) {
                            ApiAi.finishListening();
                            this.setState({ buttonText: "Start Listening", listening: false })
                        } else {
                            ApiAi.startListening(result => {
                                this.setState({ result: JSON.stringify(result) });
                            }, error => {
                                this.setState({ result: JSON.stringify(error) });
                            });
                            this.setState({ buttonText: "Stop Listening", listening: true })
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
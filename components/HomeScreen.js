import React, {Component} from 'react';
import {NativeModules, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {appid} from '../applicationid.js';
import RNKommunicateChat from 'react-native-kommunicate-chat';

export class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
      };

    constructor() {
        super();
        this.state = {
          welcometext: 'Welcome user.'
        }
    }

    componentDidMount() {
      //var mkommunicate = NativeModules.KommunicateChat;

      //go to login screen if no user is logged in
      if(RNKommunicateChat.isLoggedIn((obj) => {
        if(obj == "False") {
          this.props.navigation.replace('Login');
        }
      }));

      RNKommunicateChat.getLoggedInUser((response, obj) => {
        if(response == 'Error') {
          return;
        } else if(response == 'Success') {
          var user = JSON.parse(obj);
          //do whatever you want with this user
        }
      })

      
    }

    openConversation = () => {
      //var mkommunicate = NativeModules.KommunicateChat;
      RNKommunicateChat.createToast("Opening conversation...");
      RNKommunicateChat.openConversation((obj, message) => {
        if(obj == 'Error') {
          RNKommunicateChat.createToast(message);
        }
      });
    }

    createConversation = () => {
      //var mkommunicate = NativeModules.KommunicateChat;
      RNKommunicateChat.createToast("Creating conversation...");
      RNKommunicateChat.buildConversation({applicationId: appid, isUnique: false}, () => {
        //show status message
      })
    }
    
    logout = () => {
      //var mkommunicate = NativeModules.KommunicateChat;
      RNKommunicateChat.createToast("Logging out...");
      RNKommunicateChat.logout((response) => {
        if(response == "Success") {
          RNKommunicateChat.isLoggedIn((response) => {
            if(response == "False") {
              this.props.navigation.replace('Login');
            }
          }); 
        } else {
          RNKommunicateChat.createToast("Error logging out.")
        }
      }); 
    }

    render() {
        return(
            <View style= {styles.maincontainer}>
                <Text style={styles.title}>{this.state.welcometext}</Text>
                <Text style={{color:'grey', textAlign: 'center', marginBottom: 20}}>Here you can talk with our customer support.</Text>
                <View style={styles.buttoncontainer}>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.createConversation}><Text style={{color: 'white'}}>CREATE CONVERSATION</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.openConversation}><Text style={{color: 'white'}}>OPEN CONVERSATION</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.logout}><Text style={{color: 'white'}}>LOGOUT</Text></TouchableOpacity></LinearGradient>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center'
      },
      title: {
        marginBottom: 2,
        marginTop: 18,  
        color: '#43e97b',
        fontSize: 20,
        textAlign: 'center',
      },
      button: {
        borderRadius: 30,
        marginStart: 8,
        marginEnd: 8,
        marginBottom: 8
      }
});

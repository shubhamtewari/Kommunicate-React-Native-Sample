import React, {Component} from 'react';
import {NativeModules, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import RNKommunicateChat from 'react-native-kommunicate-chat'


import {appid} from '../applicationid.js';

export class LoginScreen extends Component {

    static navigationOptions = {
        title: 'Login',
      };

    constructor() {
        super();
        this.state = {
          email: '',
          name: '',
          password: '',
        }
    }

    loginVisitor = () => {
      //var mkommunicate = NativeModules.KommunicateChat;
      RNKommunicateChat.createToast("Logging in as visitor...");
      RNKommunicateChat.loginAsVisitor(appid, (obj, message) => { 
        if(obj == 'Success') {
            RNKommunicateChat.isLoggedIn((response) => {
              if(response == "True") {
                this.props.navigation.navigate('Home');
              } else {
                RNKommunicateChat.createToast("Error logging in.");
              }
            });
            this.props.navigation.replace('Home');
       
        } else if (obj == 'Error') {
            RNKommunicateChat.createToast("Error logging in. "+message);
        }
    });
    }

    loginUser = () => {
        //var mkommunicate = NativeModules.KommunicateChat;
        RNKommunicateChat.createToast("Logging in as user...");
        if(this.state.email == '' || this.state.password == '') {
          RNKommunicateChat.createToast('Email and password cannot be empty.');
          return;
        }
        
        var kmUser = {
          userId : this.state.email,
          displayName: this.state.name,
          password: this.state.password,
          applicationId : appid,  
          authenticationTypeId: 1,
          deviceApnsType : 0 
          };

        RNKommunicateChat.loginUser(kmUser, (obj, message) => {
            if(obj == 'Success') {
                RNKommunicateChat.isLoggedIn((response) => {
                  if(response == "True") {
                    this.props.navigation.navigate('Home');
                  } else {
                    RNKommunicateChat.createToast("Error logging in.");
                  }
                });
                this.props.navigation.replace('Home');
           
            } else if (obj == 'Error') {
                RNKommunicateChat.createToast("Error logging in. "+message);
            }
        });
    }

    componentDidMount() {
      //var mkommunicate = NativeModules.KommunicateChat;
      
      //go to home if user is logged in
      if(RNKommunicateChat.isLoggedIn((obj) => {
        if(obj == "True") {
          this.props.navigation.replace('Home');
        }
      }));
    }

    render() {
        return(
    <View style={styles.maincontainer}>
      <Text style={styles.title}>kommunicate.io</Text>
      <View style={styles.inputcontainer}>
      <TextInput placeholder="name" onChangeText={(text) => {this.setState({name: text})}} style={styles.input}></TextInput>
      <TextInput placeholder="userId" onChangeText={(text) => {this.setState({email: text})}} style={styles.input}></TextInput>
      <TextInput placeholder="password" onChangeText={(text) => {this.setState({password: text})}} style={styles.input}></TextInput>
      </View>
      <View style={styles.buttoncontainer}>
        <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginUser}><Text style={{color: 'white'}}>LOGIN</Text></TouchableOpacity></LinearGradient>
        <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginVisitor}><Text style={{color: 'white'}}>LOGIN AS VISITOR</Text></TouchableOpacity></LinearGradient>
        <Text style={styles.infotext}>When logging in as visitor, you dont need to fill the email, name and 
        password fields. Clicking the 'Login as visitor' button will log you in with a random userId.</Text>
      </View>
      <Text style={styles.privacytext}></Text>
    </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 20 
    },
    title: {
      marginTop: 30,
      textAlign: "center", 
      color: '#43e97b', 
      fontSize: 20
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: 'grey',
      padding : 0,
      fontSize: 16,
    },
    inputcontainer: {
      marginTop: 25, 
      alignItems: 'stretch',
    },
    buttoncontainer: {
      marginTop: 30,
    },
    infotext: {
      textAlign: "center",
      fontSize: 12,
      color: 'grey',
      marginStart: 6,
      marginEnd: 6,
    }, 
    privacytext: {
      
    },
    button: {
      borderRadius: 30,
      marginBottom: 8,
    }
});

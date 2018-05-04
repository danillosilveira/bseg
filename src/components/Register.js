import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import css from '../styles/login-styles';
import {api} from "../../env";

const logo = require('../../assets/img/logo/fq.png');
const bg = require('../../assets/img/bg/login/login.jpg');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.auth = this.auth.bind(this);
  }
  
  async auth() {
    await axios.post(`${api.apiUrl}/authenticate`, {
      email: this.state.email,
      password: this.state.password,
      grant_type: 'password',
      client_id: '1',
      client_secret: 'c3cEQ9L7leTV4vnRbN8ehMmhjUdaSiGbys7xEn53',
      scope: ''
    }).then((res) => {
        AsyncStorage.setItem('@MySuperStore:token', res.data.success.token);
        Actions.main();
      })
      .catch((err) => {
        console.log('Erro ao se logar', err);
      });
  }
  
  render() {
    return (
      <Image source={bg} style={css.bg}>
        <StatusBar  barStyle="light-content" />
        <View style={css.loginCotainer}>
      
          <View style={css.logo}>
            <Image source={logo} style={css.logoImage} />
          </View>
      
          <TextInput
            style={css.input}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            placeholder="Nome"
            multiline={false}
            placeholderTextColor="#fff"
          />
      
          <TextInput
            style={css.input}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="Usuario"
            multiline={false}
            placeholderTextColor="#fff"
          />
      
          <TextInput
            style={css.input}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Senha"
            secureTextEntry
            maxLength={12}
            multiline={false}
            placeholderTextColor="#fff"
          />
      
          <TouchableOpacity style={css.button} underlayColor="#328fe6" onPress={this.register}>
            <Text style={css.label}>CADASTRAR</Text>
          </TouchableOpacity>
      
          <TouchableHighlight onPress={() => Actions.login()}>
            <Text style={css.signup}> Ja possuo casdastro</Text>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }
}

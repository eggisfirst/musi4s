import React, {Component} from 'react';
import { View, Text, Button, Image, TextInput, PixelRatio, TouchableOpacity } from "react-native"; 

export default class LoginScreen extends Component<Props> {
  constructor(props: object) {
    super(props);
    this.state = { 
      inputVal: '123'
    }
  }

  static navigationOptions = {
    header: null,
    headerBackTitle: 'back',
  }
  render() {
    return (
      <View style={styleSheet.container}>
        <View style={styleSheet.top}>
          <Image
            style={styleSheet.icon}
            source={require('@src/images/icon.png')}
          />
          <View>
            <Text style={styleSheet.h1}>Hello,</Text>
            <Text style={styleSheet.h2}>欢迎使用慕思助手</Text>
          </View>
        </View>

        <View>
          <Text style={styleSheet.formTit}>密码登陆{this.state.inputVal}</Text>

          <View style={styleSheet.inputBox}>
          <Text style={styleSheet.label}>密码</Text>
            <TextInput
            style={styleSheet.input}
            onChangeText={(text) => this.setState({inputVal: text})}
            value={this.state.inputVal}
            />
          </View>
          <View style={styleSheet.inputBox}>
            <Text style={styleSheet.label}>密码</Text>
            <TextInput
            style={styleSheet.input}
            onChangeText={(text) => this.setState({inputVal: text})}
            value={this.state.inputVal}
            />
          </View>

          <TouchableOpacity
          style={styleSheet.button}
          onPress={() => {this.props.navigation.replace('Work')}}
          >
            <Text style={styleSheet.btnText}>登陆</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styleSheet.copyright}>Copyright © 2019 de RUCCI All rights reserved</Text>
      </View>
    )
  }
}

const styleSheet = {
  container: {
    // display: 'flex',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    height:  '100%',
  },
  top: {
    width: '100%',
    height: 100,
    // flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 150,
  },
  icon: {
    width: 80,
    height: 80,
    // flex: 1,
  },
  h1: {
    fontSize: 36,
  },
  h2: {
    fontSize: 24,
    lineHeight: 44,
  },
  formTit: {
    fontSize: 18,
    marginTop: 50,
    marginBottom: 25,
  },
  inputBox: {
    paddingTop:  30,
  },
  input: {
    height: 40,
    borderColor: '#007AFF',
    borderBottomWidth: 1/PixelRatio.get(),
    fontSize: 16,
  },
  label: {
    fontSize: 12,
    color: '#BEBEBE',
  },
  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor:  '#007AFF',
    marginTop: 50,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 50,
  },
  copyright: {
    fontSize: 12,
    color: '#909090',
    // textAlign: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 30,
    width: '100%',
  }
}

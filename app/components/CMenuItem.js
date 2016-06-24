/**
*
* Menu items displayed inside drawer, or tabs
*
* @author skh
**/

import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  PixelRatio,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CMenuItem extends Component {
  props: {
    icon: string;
    title: string;
    onPress: () => void;
  };

  render() {
    return (
      <TouchableHighlight underlayColor="#888" onPress={this.props.onPress}>
        <View style={styles.btn}>
          <Icon style={styles.btnIcon} name={this.props.icon} size={20}></Icon>
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  btn:{
    flexDirection:"row",
    alignItems:"center",
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:"#fff"
  },
  btnIcon:{
    flex:1,
    textAlign:"center",
    color:"#555"
  },
  btnText:{
    flex:3,
    fontSize:14,
    fontWeight:"500",
    paddingLeft:20,
    color:"#454545"
  }
});

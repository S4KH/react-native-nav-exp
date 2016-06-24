'use strict';

/**
*
* Post screen UI
* @author skh
**/

import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Image,StyleSheet,CameraRoll,Text,TextInput,TouchableHighlight,View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CToolbar from './CToolbar';
import {updateTextNum, back, storeImages} from '../actions';


class PostScreen extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {numOfText, images, storeImages} = this.props;
    const leftItem = {
      icon:'arrow-back',
      layout:'icon',
      onPress:() => this.props.back()
    }
    return(
      <View style={styles.container}>
        <CToolbar
          leftItem={leftItem}
          foreground='light'
          title='New post' />
        <Text style={styles.text}>{this.props.post.numOfText}</Text>
        <TextInput
          ref="textarea"
          style={styles.textArea}
          autofocus={true}
          maxLength={140}
          multiline={true}
          placeholder="The keyboard is yours.."
          selectionColor="#2aa2ef"
          placeholderTextColor="#ced8de"
          onChangeText={(text) => this.props.updateTextNum(text)}></TextInput>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  text:{
    color:"#ccd6dd",
    padding:5,
    fontSize:18,
    alignSelf:'flex-end'
  },
  textArea:{
    height:335,
    padding:15,
    fontSize:20
  },
});

function select(store){
  return {
    post: store.post
  }
}

function actions(dispatch){
  return{
    updateTextNum:(text)=>{
      dispatch(updateTextNum(text))
    },
    back:()=>{
      dispatch(back())
    },
    storeImages:(images)=>{
      dispatch(storeImages(images))
    }
  }
}

module.exports=connect(select, actions)(PostScreen);

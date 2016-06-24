/**
* Top-level app navigation
*
* @author skh
**/

import React, {
  Component,
} from 'react';
import {StyleSheet,
  Text,
  View,
  NavigationExperimental,
} from 'react-native';
import { connect } from 'react-redux';
import CMenu from './CMenu';
import PostScreen from './PostScreen';
const { CardStack: NavigationCardStack } = NavigationExperimental;

class GNavigation extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <NavigationCardStack
				direction={'vertical'}
				navigationState={this.props.navigation}
				onNavigate={this.props.onNavigate}
				renderScene={this.renderCurrentScene.bind(this)}
				style={styles.main}
			/>
    );
  }

  renderCurrentScene(props){
    const sceneState = props.scene.navigationState;

    // Can add different scenes that needs to be rendered as top-card
    switch(sceneState.type){
      case 'mainTabs':
      return <CMenu />;
      case 'post':
      return <PostScreen />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

function select(store){
  return{
    navigation: store.globalNavigation
  }
}

function actions(dispatch){
  return {
    onNavigate: (action)=> dispatch(action)
  }
}

module.exports=connect(select, actions)(GNavigation);

/**
*
* Menu for android. Uses DrawerLayoutAndroid
*
* @author skh
*
**/

'use strict';

import React, {
  Component,
} from 'react';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  View,
  Image,
  BackAndroid,
  Text,
  NavigationExperimental
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CToolbar from './CToolbar';
import CMenuItem from './CMenuItem';
import {push, back, openPost} from '../actions';

const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

class SPMenu extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', () => {
        this.props.onBack();
        return true;
    });
  }

  renderNavigationView() {
    const children = this.props.navigation.children.map( (tab, i) => {
      return (
        <CMenuItem
          key={tab.key}
          title={tab.title}
          onPress={()=>{
              this.drawer && this.drawer.closeDrawer();
              this.props.onNavigate(JumpToAction(i))
            }
          }
          icon={tab.icon}/>
      );
    });
    return (
      <View style={styles.drawer}>
        {children}
      </View>
    );
  }
  renderContent() {
    const leftItem = {
      icon:'menu',
      layout:'icon',
      onPress:() => this.drawer && this.drawer.openDrawer()
    };
    const rightItem = {
      icon:'edit',
      title: '',
      layout:'icon',
      onPress: this.props.openPost
    };
    switch (this.props.tab.key){
      default:
        return(
          <View style={styles.container}>
            <CToolbar
              leftItem={leftItem}
              rightItem={rightItem}
              foreground='light'
              title={this.props.tab.title}
            />
            <Text style={styles.content}>{this.props.tab.title}</Text>
          </View>
        )
    }
  }
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView.bind(this)}
        drawerLockMode = {this.props.tab.key === 'home' ? 'unlocked' : 'locked-closed'}
        onDrawerOpen={()=>{
          this._overrideBackPressForDrawerLayout = true;
        }}
        onDrawerClose={()=>{
          this._overrideBackPressForDrawerLayout = false;
        }}
        ref={(drawer)=>this.drawer=drawer}
      >
        {this.renderContent()}
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    //justifyContent: 'center'
  },
  content: {
    marginTop:20,
    fontSize: 30,
    textAlign:'center'
  }
});

function select(store) {
	return {
    tab: store.tabs.children[store.tabs.index],
    navigation: store.tabs
	}
}

function actions(dispatch) {
	return {
    dispatch,
    onNavigate: (action) => dispatch(action),
    openPost: () => dispatch(openPost()),
    onBack: ()=> dispatch(back())
  }
}


module.exports = connect(select, actions)(SPMenu)

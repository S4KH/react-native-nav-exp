/**
*
*
* Menu and toolbar for IOS. Uses TabBarIOS
*
* @author skh
*
**/

'use strict';

import React, {
  TabBarIOS,
  StyleSheet,
  View,
  NavigationExperimental
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import CustomView from './CustomView';


const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

class CMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTabContent(tab){
    //Add your tab screens
    switch(tab.key){
      default:
        return <CustomView title={tab.title}/>;
    }
  }

  onTabSelect(index, tab){
    if(this.props.navigation.index !== index){
      this.props.onNavigate(JumpToAction(index))
    }
  }
/** adding more than 5 items here is unsupported by RN on iOS **/
  render() {
    const children = this.props.navigation.children.map( (tab, i) => {
      return (
        <Icon.TabBarItemIOS key={tab.key}
            iconName={tab.icon}
            selectedIconName={tab.selectedIcon}
            title={tab.title} onPress={ () => this.onTabSelect(i, tab) }
            selected={this.props.navigation.index === i}>
            { this.renderTabContent(tab) }
        </Icon.TabBarItemIOS>
      );
    });
    return (
      <TabBarIOS tintColor="black">
        {children}
      </TabBarIOS>
    );
  }
}


function select(store) {
	return {
    navigation: store.tabs
	}
}

function actions(dispatch) {
	return {
    dispatch,
    onNavigate: (action) => dispatch(action),
  }
}

module.exports = connect(select,actions)(SPMenu);

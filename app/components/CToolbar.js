/**
 *
 * Toolbar component for both IOS and Android. Uses ToolbarAndroid for Android
 *
 * @author skh
 */

'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ToolbarAndroid,
  Platform,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import main_style from './main_style';

export type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
  | 'icon'         // Always use icon
  | 'title';       // Always use title

export type Foreground = 'light' | 'dark';

const CColors = {
  actionText: '#3FB4CF',
  inactiveText: '#9B9B9B',
  darkText: main_style.COLOR.TEXT_COLOR_BLACK,
  lightText: '#7F91A7',
  cellBorder: '#EEEEEE',
  darkBackground: '#183E63'
};

export type Item = {
  title?: string;
  icon?: string;
  layout?: Layout;
  onPress?: () => void;
};

export type Props = {
  title: string;
  subtitle?:string;
  leftItem?: Item;
  rightItem?: Item;
  extraItems?: Array<Item>;
  foreground?: Foreground;
  style: any;
  children: any;
};

class CToolbarAndroid extends React.Component {
  props: Props;

  render() {
    const {leftItem, rightItem, extraItems} = this.props;
    let actions = [];
    if (rightItem) {
      const {title, icon, layout} = rightItem;
      actions.push({
        iconName: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }
    if (extraItems) {
      actions = actions.concat(extraItems.map((item) => ({
        title: item.title,
        onPress: item.onPress,
        show: 'never',
      })));
    }

    const textColor = this.props.foreground === 'dark'
       ? CColors.darkText
       : 'white';
    let content;
    if (React.Children.count(this.props.children) > 0) {
      content = (
        <View collapsable={false} style={{flex: 1}}>
          {this.props.children}
        </View>
      );
    }
    {/*subtitle={this.props.subtitle}
    subtitleColor={textColor}*/}
    return (
      <View style={[styles.toolbarContainer, this.props.style]}>
        <Icon.ToolbarAndroid
          navIconName={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          iconColor="#FFFFFF"
          title={this.props.title}
          titleColor={textColor}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
          {content}
        </Icon.ToolbarAndroid>
      </View>
    );
  }

  handleActionSelected(position: number) {
    let items = this.props.extraItems || [];
    if (this.props.rightItem) {
      items = [this.props.rightItem, ...items];
      const item = items[position];
      item && item.onPress && item.onPress(item.value);
      return;
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}


class CToolbarIOS extends React.Component {
  props: Props;

  render() {
    const {leftItem, title, rightItem, foreground, extraItems} = this.props;
    const titleColor = foreground === 'dark' ? CColors.darkText : 'white';
    const itemsColor = foreground === 'dark' ? CColors.lightText : 'white';

    // "extraItems" takes priority over "rightItem"
    var rightNavActionItems;
    if (extraItems) {
      rightNavActionItems = rightItem;
    } else {
      rightNavActionItems = extraItems;
    }

    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText, {color: titleColor}]}>
          {title}
        </Text>
      : this.props.children;
    return (
        <View style={[styles.header, this.props.style]}>
          <View style={styles.leftItem}>
            <ItemWrapperIOS color={itemsColor} item={leftItem} />
          </View>
          <View
            accessible={true}
            accessibilityLabel={title}
            accessibilityTraits="header"
            style={styles.centerItem}>
            {content}
          </View>
          <View style={styles.rightItem}>
            <ItemWrapperIOS color={itemsColor} item={rightNavActionItems} />
          </View>
        </View>
    );
  }

}

class ItemWrapperIOS extends React.Component {
  props: {
    item: Item;
    color: string;
  };

  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress} = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Icon name={icon} size={25} />;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}


var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    backgroundColor: '#CC99FF',
    elevation: 2
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  leftItem: {
    flex: 0.5,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2.5,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

const Toolbar = Platform.OS === 'ios' ? CToolbarIOS : CToolbarAndroid;
Toolbar.height = HEADER_HEIGHT;

module.exports = Toolbar;

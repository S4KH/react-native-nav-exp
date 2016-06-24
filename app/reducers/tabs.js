import  { NavigationExperimental, Platform } from 'react-native';
const { Reducer: NavigationReducer } = NavigationExperimental;

const tabsAndroid = [
  { key: 'best', icon:"star",  title: 'Best' },
  { key: 'alerts', icon:"alarm",  title: 'Alerts' },
  { key: 'friends', icon:"people",  title: 'Friends' },
  { key: 'me', icon:"person",  title: 'Me' },
];

const tabsIOS = [
  { key: 'best',icon:"ios-star-outline", selectedIcon:"ios-star", title: 'Best' },
  { key: 'alerts', icon:"ios-bell-outline", selectedIcon:"ios-bell", title: 'Alerts' },
  { key: 'friends', icon:"ios-people-outline", selectedIcon:"ios-people", title: 'Friends' },
  { key: 'me', icon:"ios-person-outline", selectedIcon:"ios-person", title: 'Me' },
];

const tabs = Platform.OS==='android' ? tabsAndroid : tabsIOS;

const tabsReducer = NavigationReducer.TabsReducer({
  key: 'mainTabs',
  initialIndex: 0,
  tabReducers: tabs.map(t => (lastRoute) => lastRoute || t),
});

module.exports = tabsReducer;

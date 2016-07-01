/**
*
* Simple component
*
* @author skh
*
**/


import React, {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class CustomView extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop:56,
    fontSize: 30,
    textAlign:'center'
  }
});

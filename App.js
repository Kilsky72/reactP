/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Button, ThemeProvider, Header, SearchBar, SocialIcon } from 'react-native-elements';
import { createStackNavigator,
    createAppContainer,
    createDrawerNavigator, 
    createSwitchNavigator,
    DrawerItems,
    SafeAreaView,
    DrawerNavigator,
    createBottomTabNavigator,
    DrawerActions,
} from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatPrettyObject } from 'jest-validate/build/utils';
class ActivityBrowser  extends React.Component {

  state = {
    search: '',
  };
  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
        placeholder="輸入關鍵字..."
        onChangeText={this.updateSearch}
        value={search}
        />
        <Text onPress={() => this.props.navigation.navigate('Login')} style={styles.messageBox}>活動名稱: </Text>
      </View>
    );
  }
}

class Login extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
      
        <SocialIcon   
          title='以Facebook登入'
          button
          type='facebook'
          onPress={() => this.props.navigation.navigate('Home')}
          />
        <SocialIcon 
          title='以Google登入'
          button
          type='google'
          />
      </View>
    );
  }
}

class HomeScreen extends React.Component{
  render() {
    return (
      <View style={{ flex: 1,}}>
        <Header
          leftComponent = {<Icon name ='menu' size = {30} color='#000000' onPress={()=> DrawerActions.OPEN_DRAWER} />}
        />
      </View>
    );
  }
}





const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    drawerPosition: 'left'
  }
  
);

const RootStack = createStackNavigator(
  {
  Activity: {
    screen: ActivityBrowser,
    navigationOptions: {
      header: null,
  }
  },

  Login: {
    screen: Login,
  },

  Home: {
    screen: AppDrawerNavigator,
    navigationOptions: {
      header: null,
  }
  },
},
{
  initialRouteName: 'Activity',
}
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
  messageBox:{
    backgroundColor:'#87CECB',
    width:300,
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20, 
    borderRadius:10
},
});


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
import { 
    createStackNavigator,
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
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

import { formatPrettyObject } from 'jest-validate/build/utils';
class ActivityBrowserScreen  extends React.Component {
  static navigationOptions = {
    header: null,
  };
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
        <Text onPress={() => 
        this.props.navigation.navigate('Login')} style={styles.messageBox}>活動名稱:
        </Text>
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
      
      <SocialIcon   
          title='以Facebook登入'
          button
          type='facebook'
          onPress={() => LoginManager.logInWithReadPermissions(["public_profile"]).then(
  function(result) {
    if (result.isCancelled) {
      console.log("Login cancelled");
    } else {
      navigate('HomePage');

  }
  },
  function(error) {
    console.log("Login fail with error: " + error);
  }
)}
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
  static navigationOptions =({ navigation }) => {
    return{
      headerLeft: (
      <Icon
				onPress={()=> navigation.openDrawer()} 
        name='menu'
        color="#000000"
        size = {30}
        />
      ),
    };
  };
  render() {
    return (
      <View style={{ flex: 1,}}>
      <Text></Text>
      </View>
    );
  }
}



const HomePageNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
     // header: null,
  }
  }
},
{
  initialRouteName: 'Home',
}
);

const AppDrawerNavigator = createDrawerNavigator({
  Home: HomePageNavigator,

  },
{
  drawerPosition: 'left'
}

);

const PreLoginNav = createStackNavigator(
  {
  Activity: {
    screen: ActivityBrowserScreen,
    navigationOptions: {
    //  header: null,
  }
  },

  Login: {
    screen: LoginScreen,
    navigationOptions: {
    //  header: null,
  }
  },


},
{
  initialRouteName: 'Activity',
}
);

const RootStack = createStackNavigator({
  PreLogin:{
    screen: PreLoginNav,
    navigationOptions: {
        header: null,
    }
  },
  HomePage :{
    screen: AppDrawerNavigator,
    navigationOptions: {
      header: null,
    }
  }
},
{
  initialRouteName: 'PreLogin',
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


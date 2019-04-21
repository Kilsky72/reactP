/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry,Image } from 'react-native';
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
import { LoginButton, AccessToken, LoginManager, logout,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';

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
        this.props.navigation.navigate('Login')} style={{marginTop:20,marginLeft:5,backgroundColor:'#87CECB',width:350,
    paddingTop:20,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderBottomWidth:1,
    borderTopWidth:1,
    borderLeftWidth:1,
    borderRightWidth:1
}}>活動名稱:{"\n"}活動地點:                                      活動時間:
        </Text>
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{marginTop: 40}}
          source={require('./assert/LOGO.png')}
        />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoginButton
    onLoginFinished={
      (error, result) => {
        if (error) {
          alert("login has error: " + result.error);
        } else if (result.isCancelled) {
          alert("login is cancelled.");
        } else {

          AccessToken.getCurrentAccessToken().then(
            (data) => {
              navigate('HomePage');
            }
          )
        }
      }
    }
    onLogoutFinished={() => alert("logout.")}/>
        <SocialIcon
          title='以Google登入'
          button
          type='google'
          />
      </View>
    </View>
    );
  }
}

class HomeScreen extends React.Component{

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({name: result.name, pic: result.picture.data.url});
    }
  }

  componentWillMount() {
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=name,picture',
      null,
      this._responseInfoCallback
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

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
      <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
        <Image style={{marginTop: 40}}
          source={require('./assert/LOGO.png')}
        />
        <View  style={{flex:1,justifyContent: "center",alignItems: "center"}}>
       <Text style={{textAlignVertical: "center",textAlign: "center",}} >
       會議時間:{"\n\n\n"}
       </Text>
       <Text style={{textAlignVertical: "center",textAlign: "center",}} >
       會議時間:
       </Text>
       </View>
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

const CustomDrawerComponent = (props) =>(
<View>
  <View style={{ justifyContent: "center",alignItems: "center"}}>
          <Image
          style={{width: 80,height: 80,marginTop: 40}}
          source={require('./assert/Avatar.png')}
        />
        <Text>姓名{"\n"}email</Text>
  </View>
  <DrawerItems {...props}/>
</View>
)

const AppDrawerNavigator = createDrawerNavigator({

  Home: HomePageNavigator,

  },
{

  drawerPosition: 'left',
  contentComponent: CustomDrawerComponent
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

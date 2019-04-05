import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Button, ThemeProvider, Header, SearchBar, SocialIcon } from 'react-native-elements';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatPrettyObject } from 'jest-validate/build/utils';

export default class Drawer extedns React.Component {
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Screen 3 </Text>
      </View>
    );
  }
}
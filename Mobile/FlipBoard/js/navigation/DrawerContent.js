import React from'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../components/Context'

import { SignOutFirebase } from '../Login/FirebaseAPI'

export default function DrawerContent(props) {

  const { signOut } = React.useContext(AuthContext);

  const storeIsNotLogged = async () => {
    try {
        signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const PressOut = async () => {
      await SignOutFirebase().then( function () {
          storeIsNotLogged()
      })
  }

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
      setIsDarkTheme(!isDarkTheme);
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={
                  require("../../assets/profile.jpg")
                }
                size={50}
              />
              <View style={{marginLeft:15, flexDirection:'column'}}>
                <Title style={styles.title}>Julie</Title>
                <Caption style={styles.caption}>@_julie</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>3</Paragraph>
                <Caption style={styles.caption}>Likes</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>6</Paragraph>
                <Caption style={styles.caption}>Follow</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="home"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {props.navigation.navigate('Home')}}
              />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons name="view-dashboard-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Abonnements"
              onPress={() => {props.navigation.navigate('Abonnements')}}
              />
            <DrawerItem
              icon={({color, size}) => (
                <Entypo name="magnifying-glass"
                  color={color}
                  size={size}
                />
              )}
              label="Rechercher"
              onPress={() => {props.navigation.navigate('Rechercher')}}
              />
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="user"
                  color={color}
                  size={size}
                />
              )}
              label="Profil"
              onPress={() => {props.navigation.navigate('Profil')}}
              />
          </Drawer.Section>
          <Drawer.Section title="Préférences">
            <TouchableRipple onPress={() => {toggleTheme()}}>
              <View style={styles.preference}>
                <Text>Thème sombre</Text>
                <Switch value={isDarkTheme}/>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" size={size} color={color} />
          )}
          label="Déconnexion"
          onPress={() => {PressOut()}}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

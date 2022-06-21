import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from '../bottomtab/bottomIndex';
import CustomSidebarMenu from '../../components/CustomDrawer';
const Drawer = createDrawerNavigator();
export default function Drawerscreen({navigation}) {
  return (
    <Drawer.Navigator
      // overlayColor="black"

      initialRouteName="New"
      drawerStyle={{
        width: '75%',
        // opacity: 0.5,
      }}
      drawerContent={props => (
        <CustomSidebarMenu {...props} navigation={navigation} />
      )}>
      <Drawer.Screen name="Home" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

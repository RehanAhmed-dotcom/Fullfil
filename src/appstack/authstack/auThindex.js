import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Loginscreen from '../../authscreens/Loginscreen';
import Regscreen from '../../authscreens/registerscreen';
import Forgetscreen from '../../authscreens/forgetpass';
import Codescreen from '../../authscreens/codescreen';
import Emailconfirm from '../../authscreens/emailconfirm';
import DOB from '../../authscreens/DOB';
import Dataselection from '../../authscreens/Dataselection';
import MosteEated from '../../authscreens/MostEated';
import FimiliarmodalDetail from '../../authscreens/FimiliarmodalDetail';
import HealthAssesment from '../../authscreens/HealthAssesment';
import AddAfirmation from '../../appscreens/AddAfirmation';
import Login from '../../authscreens/Login';
import {useSelector} from 'react-redux';
import EnterCode from '../../ForgotPassword/enterCode';
import NewPassword from '../../ForgotPassword/newPassword';
import SubmitEmail from '../../ForgotPassword/submitEmail';

import Drawer from '../Drawerstack/Drawerstack';
import GroundingTech from '../../appscreens/Drawerscreens/GroundingTech';
const Stack = createStackNavigator();

function auThindex() {
  const {isLoggedIn} = useSelector(({USER}) => USER);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Registration"
              component={Regscreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Loginscreen" component={Loginscreen} />
            <Stack.Screen name="Forget" component={Forgetscreen} />
            <Stack.Screen name="Codescreen" component={Codescreen} />
            <Stack.Screen name="EmailConfirm" component={Emailconfirm} />
            <Stack.Screen name="DOB" component={DOB} />
            <Stack.Screen
              options={{headerShown: false}}
              name="SubmitEmail"
              component={SubmitEmail}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="NewPassword"
              component={NewPassword}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="EnterCode"
              component={EnterCode}
            />

            <Stack.Screen name="Dataselection" component={Dataselection} />
            <Stack.Screen name="MostEated" component={MosteEated} />
            <Stack.Screen
              name="FimiliarModal"
              component={FimiliarmodalDetail}
            />
            <Stack.Screen name="HealthAssesment" component={HealthAssesment} />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Drawer"
              component={Drawer}
            />
            {/* <Stack.Screen
              options={{headerShown: false}}
              name="GroundingTech"
              component={GroundingTech}
            /> */}

            <Stack.Screen name="Affirmation" component={AddAfirmation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default auThindex;

import {Card} from 'native-base';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Linking,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import Button from '../../components/Button';
const Invitefriendsscreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Invite Friends',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.mainBtnscolor,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: '#ECF6F4',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={{height: 30, width: 30, borderRadius: 10, marginLeft: 16}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <Card
        style={{
          paddingVertical: 18,
          paddingBottom: 50,
          paddingTop: 50,
          borderRadius: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/animationb_icon.png')}
            style={styles.imagestyle}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Image
            source={require('../../assets/animationa_icon.png')}
            style={{height: 55, width: 55}}
          />
          <Image
            source={require('../../assets/opq.png')}
            style={{height: 55, width: 55}}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/rst.png')}
            style={styles.imagestyle}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 40,
            paddingVertical: 12,
          }}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Invite your friends
          </Text>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 5,
              fontSize: 14,
              color: '#757575',
              fontFamily: 'Poppins-Regular',
            }}>
            Just share this code with your friends and ask them to signup with
            this code
          </Text>
        </View>
        <View style={{paddingHorizontal: 12, paddingVertical: 20}}>
          {/* <View style={styles.btnsStyle}>
            <View style={styles.johdoesBtn}>
              <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
                Johndoesignup
              </Text>
            </View>
            <TouchableOpacity style={styles.copyBtn}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  color: '#fff',
                }}>
                Copy
              </Text>
            </TouchableOpacity>
          </View> */}
          <Button
            title={'Invite Friends'}
            // onPress={() => navigation.navigate('Affirmation')}
          />
        </View>
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          <View
            style={{
              // flexDirection: 'row',
              // backgroundColor: 'red',
              // alignItems: 'center',
              // justifyContent: 'space-around',
              width: '92%',
              marginHorizontal: 20,
            }}>
            {/* <Image
              source={require('../../assets/facebook.png')}
              style={{height: 55, width: 55}}
            /> */}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://instagram.com/thefeelgoodapp_?utm_medium=copy_link',
                )
              }
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: '100%',
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',

                borderColor: '#008B75',
              }}>
              <Image
                source={require('../../assets/instagram.png')}
                style={{
                  height: 65,
                  marginLeft: 20,
                  borderRadius: 50,
                  width: 65,
                }}
              />
              <View
                style={{
                  // backgroundColor: 'red',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    // marginLeft: 20,
                    // mar
                    // ...titlstyle,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Follow Us On
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    color: 'black',
                    // marginLeft: 20,
                    // ...titlstyle,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Instagram
                </Text>
              </View>
            </TouchableOpacity>
            {/* <Image
              source={require('../../assets/twitter.png')}
              style={{height: 55, width: 55}}
            /> */}
          </View>
        </View>
      </Card>
    </View>
  );
};

export default Invitefriendsscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  copyBtn: {
    height: 50,
    width: '30%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainBtnscolor,
  },
  imagestyle: {
    height: 55,
    width: 55,
  },
  johdoesBtn: {
    height: 50,
    width: '70%',
    borderTopLeftRadius: 30,
    elevation: 5,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECF6F4',
  },
  btnsStyle: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
});

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import {Card} from 'native-base';
import Colors from '../../constants/colors';
import Button from '../../components/Button';
const Paymentscreen = ({navigation}) => {
  const [selectedpayment, setselectedpayment] = useState(1);
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Payment',
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: '#fff',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={{height: 30, width: 30, borderRadius: 10, marginLeft: 16}}
          />
        </TouchableOpacity>
      ),
      // headerRight: () => (
      //     <Image source={require('../assets/icon_cross.png')} style={{ height: 30, width: 30, borderRadius: 10, marginRight: 16 }} />
      // )
    });
  }, []);
  const cardData = [
    {
      id: 1,
      cardText: 'Credit Card',
      image: require('../../assets/credit-card.png'),
      color: true,
    },
    {
      id: 2,
      cardText: 'PayPal',
      image: require('../../assets/paypal.png'),
      color: false,
    },
    {
      id: 3,
      cardText: 'Apple',
      image: require('../../assets/apple.png'),
      color: false,
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.midlle}>
          <View
            style={{
              backgroundColor: '#F3F3F3',
              paddingVertical: 12,
              // paddingBottom: 30
            }}>
            <Text
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                marginTop: 10,
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
              }}>
              Method
            </Text>
            <FlatList
              data={cardData}
              horizontal={true}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      const tempData = [...cardData];
                      tempData[index].color = !tempData[index].color;
                      setselectedpayment(item.id);
                    }}
                    style={{margin: 6}}>
                    <Card
                      style={{
                        height: 80,
                        width: Platform.OS === 'ios' ? 113 : 120,
                        padding: 4,
                        // backgroundColor: 'red',
                        borderWidth: selectedpayment === item.id ? 4 : 0,
                        borderColor:
                          selectedpayment === item.id
                            ? Colors.mainBtnscolor
                            : '#fff',
                        borderRadius: 6,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                        }}>
                        <Image
                          source={item.image}
                          style={{
                            height: 40,
                            width: 100,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          style={{marginTop: 5, fontFamily: 'Poppins-Regular'}}>
                          {item.cardText}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{paddingHorizontal: 12}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                paddingVertical: 10,
              }}>
              Details
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                color: Colors.mainBtnscolor,
              }}>
              Credit Card Number
            </Text>
            <TextInput
              returnKeyType="done"
              placeholder={'0000-0000-0000-0000'}
              placeholderTextColor={Colors.black}
              style={{
                backgroundColor: '#F3F3F3',
                borderRadius: 6,
                textAlignVertical: 'center',
                // paddingTop: 0,
                // paddingBottom: 0,
                paddingLeft: 10,
                fontFamily: 'Poppins-Regular',
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                paddingVertical: 10,
                color: Colors.mainBtnscolor,
                marginTop: 10,
              }}>
              Cardholder Name
            </Text>
            <TextInput
              placeholder={'John Doe'}
              returnKeyType="done"
              placeholderTextColor={Colors.black}
              style={{
                backgroundColor: '#F3F3F3',
                borderRadius: 6,
                paddingLeft: 10,
                textAlignVertical: 'center',
                // paddingTop: 0, paddingBottom: 0,
                fontFamily: 'Poppins-Regular',
                color: Colors.black,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 12,

                    fontFamily: 'Poppins-Medium',
                    paddingVertical: 10,
                  }}>
                  Expiration Date
                </Text>
                <TextInput
                  placeholder={'dd/mm'}
                  returnKeyType="done"
                  style={{
                    borderRadius: 6,
                    paddingLeft: 10,
                    // textAlignVertical: 'center',
                    // justifyContent: 'center',
                    paddingTop: 0,
                    paddingBottom: 0,
                    textAlignVertical: 'center',
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: '#F3F3F3',
                    width: '100%',
                    height: 40,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Medium',
                    paddingVertical: 4,
                  }}>
                  Security Code
                </Text>
                <TextInput
                  placeholder={'code'}
                  secureTextEntry={true}
                  returnKeyType="done"
                  style={{
                    // borderWidth: 1,
                    fontFamily: 'Poppins-Regular',
                    borderRadius: 6,
                    // textAlign: 'center',
                    paddingLeft: 10,
                    textAlignVertical: 'center',
                    backgroundColor: '#F3F3F3',
                    width: '100%',
                    height: 40,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          onPress={() => navigation.navigate('chosePlan')}
          style={{width: '100%'}}
          title={'Pay Now'}
        />
      </View>
    </View>
  );
};

export default Paymentscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  midlle: {
    flex: 4,
    // backgroundColor: 'red',
    // paddingBottom: 20,
    // backgroundColor: 'green'
  },
  bottom: {
    flex: 1,
    paddingTop: 20,
    // position: 'absolute',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // flexDirection: 'row',
    paddingHorizontal: 16,
    // bottom: 0,
    // paddingBottom: 10,
    // backgroundColor: 'grey'
  },
});

import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Modal,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import Colors from '../constants/colors';
import {viewFlashCard, addAffirmation} from '../lib/api';
import {useSelector, useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Entypo';
const AddAfirmation = ({navigation}) => {
  const [images, setImages] = useState([]);
  const {userData: user} = useSelector(({USER}) => USER);
  const [affirmationText, setaffirmationText] = useState('');
  const [vis, setVis] = useState(false);
  const [index, setIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  //const refContainer = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Add Affirmation',
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.bgColor,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icon_back.png')}
            style={{height: 30, width: 30, borderRadius: 10, marginLeft: 16}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icon_cross.png')}
            style={{height: 30, width: 30, borderRadius: 10, marginRight: 16}}
          />
        </TouchableOpacity>
      ),
    });
    viewFlashCard({Auth: user.userdata.api_token}).then(res => {
      setImages(res.data);
    });
  }, []);

  const AffirmationImages = [
    {
      id: 1,
      image: require('../assets/imagea.png'),
    },
    {
      id: 2,
      image: require('../assets/imageb.png'),
    },
    {
      id: 3,
      image: require('../assets/imagec.png'),
    },
    {
      id: 4,
      image: require('../assets/imaged.png'),
    },
    {
      id: 5,
      image: require('../assets/imagee.png'),
    },
    {
      id: 6,
      image: require('../assets/imagef.png'),
    },
  ];
  // console.log('card', images[0].flashcard);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topcontainer}>
          <View style={styles.headingview}>
            <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
              Write Affirmation
            </Text>
            <TouchableOpacity>
              <Text
                onPress={() => {
                  affirmationText &&
                    addAffirmation({
                      Auth: user.userdata.api_token,
                      affirmation: affirmationText,
                    }).then(res => {
                      if (res) {
                        navigation.navigate('Home');
                      } else {
                        Alert.alert('Something went wrong');
                      }
                    });
                }}
                style={{
                  fontSize: 14,
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Medium',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{...styles.inputStyle1, marginTop: 5}}>
            <TextInput
              returnKeyType="done"
              value={affirmationText}
              placeholderTextColor={'#ccc'}
              onChangeText={text => setaffirmationText(text)}
              placeholder={'Enter Affirmation'}
              textAlignVertical="top"
              multiline={true}
              style={styles.inputStyle}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              // backgroundColor: Colors.mainBtnscolor,
              marginTop: 20,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 16, fontFamily: 'Poppins-SemiBold'}}>
              Feel Good Flash Cards
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                color: '#828282',
                fontFamily: 'Poppins-Medium',
              }}>
              Upgrade now to use cards
            </Text> */}
          </View>
        </View>
        <View style={styles.Middleview}>
          <FlatList
            data={images}
            numColumns={3}
            contentContainerStyle={{alignItems: 'center'}}
            renderItem={({item}) => {
              console.log('item', item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    setVis(true);
                    setCarouselItems(item.flashcard);
                  }}>
                  <Image
                    source={{uri: item.flashcard[0].image}}
                    style={styles.listimagestyle}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.Endview}>
          <Button
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              marginTop: 15,
            }}
            title={'Available with PRO \n  \tUpgrade Now'}
            onPress={() => navigation.navigate('chosePlan')}
          />

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Paymentscreen')}
            style={{
              height: 70,
              backgroundColor: '#008B75',
              borderRadius: 10,
              marginTop: Platform.OS==='ios' ? 0 : 30,
              // marginBottom: 30,
              elevation: 4,
              alignItems: 'center',
              justifyContent: 'center',
              // ...style,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                // ...titlstyle,
                fontFamily: 'Poppins-Medium',
              }}>
              Available with PRO
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                // ...titlstyle,
                fontFamily: 'Poppins-Medium',
              }}>
              Upgrade Now
            </Text>
          </TouchableOpacity> */}
        </View>
        {/* <View style={{height: 30}}></View> */}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <Swiper
            // autoplay
            activeDotColor="#008B75"
            style={{alignItems: 'center', justifyContent: 'center'}}
            showsButtons={false}>
            {carouselItems.map((item, index) => (
              <View style={{flex: 1, height: '100%', width: '100%'}}>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    marginTop: 10,
                    marginLeft: 10,
                  }}>
                  <Icon
                    style={{marginTop: 30}}
                    name="circle-with-cross"
                    size={20}
                    onPress={() => setVis(!vis)}
                  />
                </View>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
            ))}
          </Swiper>
          {/*          
          <View
            style={{
              borderRadius: 10,
              height: hp(70),
              alignItems: 'center',
              width: wp(80),
              backgroundColor: 'white',
            }}>
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              {carouselItems.length !== 0 && (
                <Carousel
                  layout={'default'}
                  // ref={refContainer}
                  data={carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={_renderItem()}
                  onSnapToItem={index => setIndex(index)}
                />
              )}
            </View>
          </View> */}
        </View>
      </Modal>
    </View>
  );
};

export default AddAfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 20,
    paddingHorizontal: 16,
  },
  topcontainer: {
    flex: 0.2,
    // backgroundColor: 'red'
  },
  headingview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  Middleview: {
    flex: 3,
    // backgroundColor: 'red',
    // height: '100%',
    // bottom: 20,
    // backgroundColor: 'grey'
  },
  inputStyle: {
    borderWidth: 0,
    elevation: 0.5,
    color: 'black',
    height: 140,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 12,
    borderRadius: 10,
    backgroundColor: Colors.bgColor,
    width: '95%',
    //  backgroundColor:'red'
  },
  inputStyle1: {
    borderWidth: 0,
    elevation: 0.5,
    color: 'black',
    height: 140,
    fontFamily: 'Poppins-Regular',
    // paddingLeft: 12,
    borderRadius: 10,
    backgroundColor: Colors.bgColor,
    // paddingTop: 10,
  },
  listimagestyle: {
    height: (wp(33) - 6) * 1.5,
    width: wp(33) - 6,
    marginVertical: 4,
    marginHorizontal: 5,
    resizeMode: 'cover',
  },
  Endview: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    // backgroundColor: 'yellow'
  },
});

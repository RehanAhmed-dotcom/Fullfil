import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import {Card, Left, Body, Right} from 'native-base';
import Colors from '../../constants/colors';
import Button from '../../components/Button';
import {viewMusic} from '../../lib/api';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {useSelector, useDispatch} from 'react-redux';
// import { State } from 'react-native-gesture-handler';
const height = Dimensions.get('window').height;
const Mediascreen = ({navigation}) => {
  const {userData: user} = useSelector(({USER}) => USER);
  const [freeSongs, setFreeSongs] = useState([]);
  const [play, setPlay] = useState('play');
  const [audio, setAudio] = useState('paused');
  const [show, setShow] = useState('');
  const [img, setImg] = useState('');
  const [staate, setStaate] = useState(TrackPlayer.getState());
  const [showModal, setShowModal] = useState(false);
  const [paidSongs, setPaidSongs] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'Feel Good Dietitian On Demand',
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: '#fff',
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            TrackPlayer.pause().then(() => {
              setShow('');
              setPlay('play');
            });
            TrackPlayer.destroy();
            navigation.goBack();
          }}>
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
  const playbackState = usePlaybackState();
  // console.log('play', TrackPlayer);
  // console.log('stop', TrackPlayer.stop());
  useEffect(() => {
    viewMusic({Auth: user.userdata.api_token}).then(res => {
      setFreeSongs(res.free_music);
      setPaidSongs(res.paid_music);
    });
    TrackPlayer.setupPlayer();

    // .then(async () => {
    // await TrackPlayer.add({
    //   id: audio.id ? audio.id + 'a' : 'avaritia',
    //   url: audio.audio
    //     ? audio.audio
    //     : 'https://www1.247naijabuzz.com/wp-content/uploads/2020/04/Jahmiel-Dead-Xample.mp3',
    //   // 'https://www1.247naijabuzz.com/wp-content/uploads/2020/04/Jahmiel-Dead-Xample.mp3'
    //   title: 'Track Title',
    //   artist: 'Track Artist',
    // });
    // });
    // console.log('ready');
  }, []);
  const check = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('i am called');
    } else {
      console.log('i am paused');
    }
  };
  useEffect(() => {
    if (playbackState == 'paused') {
      setAudio('paused');
      // setPlay('play');
    }
  }, [playbackState]);
  const fun = async item => {
    if (playbackState != State.Playing) {
      TrackPlayer.add({
        id: item.id + 'a',
        url: item.audio,

        title: 'Track Title',
        artist: 'Track Artist',
      }).then(() => {
        TrackPlayer.play().then(() => {
          // setImg(item.id);
          // setShow(item.id);
          setPlay('pause');
          setAudio('playing');
          // console.log('state in play', state, State.Playing, State.Paused);
        });
      });
    } else {
      TrackPlayer.pause().then(() => {
        // setShow('');
        setAudio('paused');
        setPlay('play');
        // console.log('state in pause', state, State.Playing, State.Paused);
      });
      // console.log('not running');
    }
    // return state;
  };
  console.log('stop', playbackState);
  const myModal = () => (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '90%',
            height: '25%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>The one that reasons available with pro only!</Text>
          <View style={{flexDirection: 'row', top: 30}}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                navigation.navigate('chosePlan');
              }}
              style={{
                width: '40%',
                alignItems: 'center',
                backgroundColor: 40,
                borderRadius: 5,
                justifyContent: 'center',
                backgroundColor: '#008B75',
              }}>
              <Text style={{color: 'white'}}>Upgrade Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                width: '40%',
                height: 40,
                borderWidth: 1,
                marginLeft: 15,
                borderRadius: 5,
                borderColor: '#008B75',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          // marginTop:-20,
          height: 80,
          // backgroundColor: 'yellow',
          // paddingTop: 28,
          //  justifyContent:'center',
          alignContent: 'center',
          // //  alignItems:'center'
          margin: 15,
        }}>
        <FlatList
          data={freeSongs}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View key={'index' + index}>
                <Card
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 6,
                    // backgroundColor:'red'
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Left style={{flex: 3}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: 200,
                          // backgroundColor: 'red',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={async () => {
                            const state = await TrackPlayer.getState();
                            console.log('item', playbackState);
                            fun(item);
                            // setPlay(
                            //   play == 'pause' || 'stop' ? 'play' : 'pause',
                            // );
                            // img==item.id ?
                            // play == 'play'
                            //   ? TrackPlayer.add({
                            //       id: item.id + 'a',
                            //       url: item.audio,

                            //       title: 'Track Title',
                            //       artist: 'Track Artist',
                            //     }).then(() => {
                            //       TrackPlayer.play().then(() => {
                            //         setImg(item.id);
                            //         setShow(item.id);
                            //         setPlay('pause');
                            //       });
                            //     })
                            //   : //     })
                            //     TrackPlayer.pause().then(() => {
                            //       setShow('');
                            //       setPlay('play');
                            //     });
                            // img == item.id
                            //   ? play == 'play'
                            //     ? TrackPlayer.add({
                            //         id: item.id + 'a',
                            //         url: item.audio,

                            //         title: 'Track Title',
                            //         artist: 'Track Artist',
                            //       }).then(() => {
                            //         TrackPlayer.play().then(() => {
                            //           setImg(item.id);
                            //           setShow(item.id);
                            //           setPlay('pause');
                            //         });
                            //       })
                            //     : //     })
                            //       TrackPlayer.pause().then(() => {
                            //         setShow('');
                            //         setPlay('play');
                            //       })
                            //   : play == 'play'
                            //   ? (TrackPlayer.destroy(),
                            //     TrackPlayer.setupPlayer().then(() => {
                            //       TrackPlayer.add({
                            //         id: item.id + 'a',
                            //         url: item.audio,
                            //         title: 'Track Title',
                            //         artist: 'Track Artist',
                            //       }).then(() => {
                            //         TrackPlayer.play().then(() => {
                            //           setImg(item.id);
                            //           setShow(item.id);
                            //           setPlay('pause');
                            //         });
                            //       });
                            //     }))
                            //   : TrackPlayer.pause().then(() => {
                            //       setShow('');
                            //       setPlay('play');
                            //     });
                            // setPlay(!play);
                            // play ? : ;
                          }}>
                          <Image
                            source={
                              audio == 'playing'
                                ? require('../../assets/active-play_icon.png')
                                : require('../../assets/active-track_icon.png')
                            }
                            style={{
                              height: 50,
                              width: 50,
                              // backgroundColor: 'red',
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                        <View style={{paddingLeft: 10}}>
                          <Text numberOfLines={1} style={styles.cardText}>
                            {item.audio_name}
                          </Text>
                          {/* <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                              color: '#858585',
                            }}>
                            {item.duration}
                          </Text> */}
                        </View>
                      </View>
                    </Left>
                    <Body></Body>
                    <Right />
                  </View>
                </Card>
              </View>
            );
          }}
        />
      </View>
      <View style={{margin: 15}}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            paddingLeft: 6,
            // marginTop: 10,

            // paddingTop: 6,
            paddingBottom: 3,
          }}>
          Locked Tracks
        </Text>

        <FlatList
          data={paidSongs}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View key={'index' + index}>
                <Card
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    // backgroundColor: 'red',
                    borderRadius: 6,
                  }}>
                  <TouchableOpacity
                    onPress={() => setShowModal(true)}
                    style={{flexDirection: 'row'}}>
                    <Left style={{flex: 3}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: 200,
                          //   backgroundColor: 'red',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          // onPress={() => Alert.alert('Upgrade')}
                          onPress={() => setShowModal(true)}>
                          <Image
                            source={require('../../assets/non-active-track_icon.png')}
                            style={{
                              height: 50,
                              width: 50,
                              // backgroundColor: 'red',
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                        <View style={{paddingLeft: 10}}>
                          <Text style={styles.cardText}>{item.audio_name}</Text>
                          {/* <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: 'Poppins-Regular',
                              color: '#858585',
                            }}>
                            {item.duration}
                          </Text> */}
                        </View>
                      </View>
                    </Left>
                    <Body></Body>
                    <Right />
                  </TouchableOpacity>
                </Card>
              </View>
            );
          }}
        />
      </View>

      <Button
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          marginTop: 80,
        }}
        title={'Available with PRO, \n  \tUpgrade Now'}
        onPress={() => navigation.navigate('Paymentscreen')}
      />
      {myModal()}
    </View>
  );
};

export default Mediascreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F6F6F6',
    // paddingHorizontal: 16,
    // backgroundColor:'red',
    // justifyContent:'center',
    // alignContent:'center'
  },
  cardText: {
    fontSize: 14,
    color: '#858585',
    fontFamily: 'Poppins-Medium',
  },
  cardText1: {
    fontSize: 14,
    color: Colors.mainBtnscolor,
    fontFamily: 'Poppins-Medium',
  },
});

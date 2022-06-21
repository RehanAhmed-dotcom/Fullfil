import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  Platform,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import {useSelector} from 'react-redux';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {addNote, viewNote} from '../../lib/api';
import Icon from 'react-native-vector-icons/Entypo';
const Editsleepscreen = ({navigation, route}) => {
  const [notes, setNotes] = useState('');
  const [addnote, setAddnote] = useState('');
  const [date, setDate] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const {userData: user} = useSelector(({USER}) => USER);
  const {id, ind} = route.params;
  const [formatedDate, setFormatedDate] = useState(
    moment().format('MM-DD-YY HH:mm'),
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const handleConfirm = date => {
    console.log('date', moment(date).format('MM-DD-YY HH:mm'));
    // setDate(moment(date).format('DD/MM/yy'));
    setFormatedDate(moment(date).format('MM-DD-YY HH:mm'));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  console.log('note', addnote);
  const myModal = () => {
    return (
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
            justifyContent: keyboardStatus ? 'flex-start' : 'center',
            backgroundColor: '#00000088',
          }}>
          {/* <Text>{addnote}</Text> */}
          <View
            style={{
              height: 400,
              width: '90%',
              backgroundColor: 'white',
              marginTop: Platform.OS == 'ios' ? 40 : 0,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
                // backgroundColor: 'red',
                right: 10,
                marginTop: 10,
              }}>
              <Icon
                name="circle-with-cross"
                size={20}
                onPress={() => setVis(!vis)}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Add Notes</Text>
              <View
                style={{
                  borderColor: 'black',
                  marginTop: 20,
                  height: 50,
                  backgroundColor: '#ccc',
                  width: '90%',
                  borderRadius: 10,
                }}>
                <TextInput
                  numberOfLines={6}
                  textAlignVertical="top"
                  returnKeyType="done"
                  placeholderTextColor="grey"
                  placeholder={'Enter notes here'}
                  value={addnote}
                  onChangeText={text => {
                    setAddnote(text);
                  }}
                  // multiline
                  style={{
                    borderColor: 'black',
                    paddingHorizontal: 20,
                    color: 'black',
                    // width: '80%',
                    height: '100%',
                    // backgroundColor: 'red',
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => showDatePicker()}
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 2,
                  paddingHorizontal: 10,
                  width: '90%',
                  marginTop: 10,
                }}>
                <Text>{formatedDate ? formatedDate : 'Date'}</Text>
                {/* <Icon1
                  name="calendar-month"
                  size={20}
                  color={Colors.mainBtnscolor}
                /> */}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  // minimumDate={new Date(currentY, currentM, currentD)}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: '20%',
                  // paddingBottom: 20,

                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    addnote &&
                      addNote({
                        Auth: user.userdata.api_token,
                        note: addnote,
                        note_id: id,
                        time: formatedDate,
                      }).then(res => {
                        console.log('res', res);
                        if (res) {
                          setVis(!vis);
                        } else {
                          Alert.alert('Some thing went wrong');
                        }
                      });
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 15,
                    width: '45%',
                    backgroundColor: '#008B75',
                  }}>
                  <Text style={{color: 'white'}}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVis(!vis);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 15,
                    width: '45%',
                    backgroundColor: 'grey',
                  }}>
                  <Text style={{color: 'white'}}> Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.mainBtnscolor,
        fontSize: 16,
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.bgColor,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={{height: 30, width: 30, borderRadius: 10, marginLeft: 16}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setVis(!vis);
            setAddnote(notes);
            setFormatedDate(date);
            console.log('====i called=====', notes);
          }}>
          <Image
            source={require('../../assets/edit.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              // resizeMode: 'contain',
              marginRight: 16,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [notes, date]);
  useEffect(() => {
    viewNote({Auth: user.userdata.api_token}).then(res => {
      console.log('reeeeee', res);
      setNotes(res.data[ind].note);
      setDate(res.data[ind].time);
    });
  }, [vis]);
  console.log('ind and id', notes);
  console.log('input', addnote);
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        <Text
          style={{
            fontSize: 12,
            color: '#8C8C8C',
            marginTop: 15,
            fontFamily: 'Poppins-Regular',
          }}>
          {date}
        </Text>
        <Text
          style={{
            paddingVertical: 2,
            fontSize: 14,
            color: '#0A0D47',
            fontFamily: 'Poppins-Regular',
          }}>
          {notes}
        </Text>
      </View>
      {myModal()}
    </View>
  );
};

export default Editsleepscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

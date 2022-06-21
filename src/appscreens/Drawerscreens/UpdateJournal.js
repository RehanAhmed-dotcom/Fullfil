import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import {addJournal} from '../../lib/api';
import {useSelector, useDispatch} from 'react-redux';
const height = Dimensions.get('window').height;

const UpdateJournal = ({navigation, route}) => {
  const {date, note, title, id} = route.params;
  const [titles, setTitle] = useState('');
  const [notes, setNote] = useState('');
  useEffect(() => {
    navigation.setOptions({
      title: 'Update Entry',

      headerStyle: {
        backgroundColor: Colors.bgColor,
        elevation: 0,
      },
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
      },
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icon_cross.png')}
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
    setTitle(title);
    setNote(note);
  }, []);
  const {userData: user} = useSelector(({USER}) => USER);
  console.log(date, note, title);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text
            style={{
              paddingVertical: 12,
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            Add Title
          </Text>
          <TextInput
            value={titles}
            onChangeText={text => setTitle(text)}
            placeholder={'Entry title'}
            returnKeyType="done"
            placeholderTextColor="#ccc"
            // multiline={true}
            style={{
              // borderWidth: .5,
              paddingHorizontal: 12,
              borderRadius: 6,
              color: 'black',
              fontFamily: 'Poppins-Regular',
              backgroundColor: Colors.bgColor,
              height: height / 18,
            }}
          />
          <Text
            style={{
              paddingVertical: 12,
              fontSize: 14,
              marginTop: 20,
              fontFamily: 'Poppins-Medium',
            }}>
            Write Note
          </Text>
          <View
            style={{
              // borderWidth: .5,
              paddingHorizontal: 12,
              color: 'black',
              fontFamily: 'Poppins-Regular',
              borderRadius: 6,
              height: 200,
              backgroundColor: Colors.bgColor,
            }}>
            <TextInput
              placeholder={'Type here'}
              textAlignVertical={'top'}
              placeholderTextColor="#ccc"
              value={notes}
              multiline={true}
              returnKeyType="done"
              onChangeText={text => {
                setNote(text);
              }}
              style={{
                // borderWidth: .5,
                // paddingHorizontal: 12,
                color: 'black',
                fontFamily: 'Poppins-Regular',
                borderRadius: 6,
                height: 200,
                backgroundColor: Colors.bgColor,
              }}
            />
          </View>
        </View>
        <View style={styles.btmContainer}>
          <Button
            title={'Update'}
            onPress={
              () =>
                addJournal({
                  Auth: user.userdata.api_token,
                  title: titles,
                  note: notes,
                  journal_id: id,
                }).then(res => {
                  console.log(res);
                  if (res) {
                    navigation.navigate('Journal');
                  } else {
                    Alert.alert('Some thing went wrong');
                  }
                })
              //
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UpdateJournal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  topContainer: {
    flex: 5,
    paddingTop: 12,
    // backgroundColor: 'green'
  },
  btmContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'grey'
  },
});

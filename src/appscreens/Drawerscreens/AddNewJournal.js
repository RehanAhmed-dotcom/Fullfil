import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import {addJournal} from '../../lib/api';
import {useSelector, useDispatch} from 'react-redux';

const AddNewJournal = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  useEffect(() => {
    navigation.setOptions({
      title: 'Add New Entry',

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
  }, []);
  const {userData: user} = useSelector(({USER}) => USER);
  console.log(user);
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
            value={title}
            returnKeyType="done"
            onChangeText={text => setTitle(text)}
            placeholder={'Entry title'}
            placeholderTextColor="#ccc"
            style={{
              // borderWidth: .5,
              paddingHorizontal: 12,
              borderRadius: 6,
              color: 'black',
              fontFamily: 'Poppins-Regular',
              backgroundColor: Colors.bgColor,
              height: Platform.OS === 'ios' ? 40 : 0,
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
              returnKeyType="done"
              textAlignVertical={'top'}
              placeholderTextColor="#ccc"
              value={note}
              multiline={true}
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
            title={'Add'}
            onPress={
              () =>
                addJournal({Auth: user.userdata.api_token, title, note}).then(
                  res => {
                    if (res) {
                      navigation.goBack();
                    } else {
                      Alert.alert('Some thing went wrong');
                    }
                  },
                )
              //
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddNewJournal;

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

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../components/Button';
import moment from 'moment';
import Colors from '../constants/colors';
const DOB = ({navigation, route}) => {
  // const [date, setDate] = useState('');
  const [dateErr, setDateErr] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');

  const [formatedDate, setFormatedDate] = useState('');
  const {firName, lastName, eMail, userName, password} = route.params;
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = date => {
    setDate(moment(date).format('DD-MM-yy'));
    setDateErr('');
    setFormatedDate(moment(date).format('MM-DD-YYYY'));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/icon_back.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              // resizeMode: 'contain',
              marginLeft: 12,
            }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: 'white',
      },
    });
  }, []);
  // console.log(firName, lastName, eMail, userName, password);
  return (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        <Text style={styles.bornText}>When were you born?</Text>
        <Text style={styles.bornTextOne}>So we can remember your birthday</Text>
        <Text style={styles.selectDate}>Select Date</Text>
        <View>
          <TouchableOpacity
            onPress={() => showDatePicker()}
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: dateErr ? 'red' : Colors.mainBtnscolor,
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <Icon name="cake" size={20} color={Colors.mainBtnscolor} />

            <Text
              style={{
                marginLeft: 40,
                color: date ? 'black' : '#ccc',
                fontFamily: 'Poppins-Regular',
              }}>
              {formatedDate ? formatedDate : 'Select date'}
            </Text>
            {/* <Icon1
              name="calendar-month"
              size={20}
              color={Colors.mainBtnscolor}
            /> */}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate(),
                )
              }
              // minimumDate={new Date(currentY, currentM, currentD)}
            />
          </TouchableOpacity>
          {/* <DatePicker
            style={styles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="Select date"
            format="DD-MM-YYYY"
            minDate="01-01-1990"
            maxDate="01-01-2022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../assets/cake.png')}
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: 'absolute',
                left: 10,
                height: 18,
                width: 18,
                top: 10,
                // marginLeft: 16,
              },
              dateInput: {
                borderRadius: 10,
                borderWidth: 1,
                borderColor: dateErr ? 'red' : '#008B75',
                // color: 'red',
                paddingRight: 150,
                height: 50,
                // marginLeft: 36,
              },
            }}
            onDateChange={date => {
              setDateErr('');
              setDate(date);
              console.log('date', date);
            }}
          /> */}
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button
          title={'Next'}
          onPress={() => {
            if (date) {
              navigation.navigate('Dataselection', {
                firName,
                lastName,
                eMail,
                userName,
                password,
                date,
              });
            } else {
              setDateErr('asdf');
            }
          }}
        />
      </View>
    </View>
  );
};

export default DOB;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  selectDate: {
    fontSize: 16,
    paddingVertical: 6,
    marginBottom: -10,
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
    color: '#111111',
  },
  bornText: {
    fontSize: 18,
    color: '#0A0D47',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    // paddingVertical: 12
  },
  bornTextOne: {
    fontSize: 14,
    color: '#9D9EB5',
    fontFamily: 'Poppins-Medium',
    // bottom: 6,
  },
  pickercontainer: {
    alignItems: 'center',
  },
  datePickerStyle: {
    width: '100%',
    borderRadius: 10,
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
    // color: 'red',
    // paddingLeft: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
});

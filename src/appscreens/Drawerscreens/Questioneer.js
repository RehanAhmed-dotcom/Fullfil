import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import {question} from '../../lib/api';
import {useSelector, useDispatch} from 'react-redux';
import {emptyquestion} from '../../redux/actions';
import {Card} from 'native-base';
const Questioneer = ({navigation}) => {
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const {userData: user} = useSelector(({USER}) => USER);
  useEffect(() => {
    navigation.setOptions({
      title: 'Questionnaires',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#008B75',
        fontSize: 14,
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
    question({Auth: user.userdata.api_token}).then(res => {
      console.log(res.data);
      // console.log(JSON.stringify(res.data.data));
      // console.log(res.data.links);

      setCategory(res.data);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      emptyquestion()(dispatch);
    });
    return unsubscribe;
  }, [navigation]);
  // console.log('category', category[0]?.questions);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingTop: 12,
      }}>
      {category.map((item, index) => (
        <>
          <TouchableOpacity
            key={index + 'a'}
            onPress={() => {
              if (index == 0) {
                navigation.navigate('BodyApreciationscale', {
                  cat: index + 1,
                  new: 'yes',
                });
              } else if (index == 1)
                navigation.navigate('Inuativescale', {cat: index + 1});
              else if (index == 2)
                navigation.navigate('mental', {cat: index + 1});
            }}

            // onPress={() =>
            //   index == 0
            //     ? navigation.navigate('BodyApreciationscale', {cat: index + 1})
            //     : navigation.navigate('Inuativescale', {cat: index + 1})
            // }
          >
            <Card style={styles.cArdstyle}>
              <Text style={styles.teXt}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
          <View style={{height: 5}} />
        </>
      ))}

      {/* <TouchableOpacity onPress={() => navigation.navigate('Inuativescale')}>
        <Card style={styles.cArdstyle}>
          <Text style={styles.teXt}>
            Intuitive Eating Scale - IES (Tracy-Tylka)
          </Text>
        </Card>
      </TouchableOpacity> */}
    </View>
  );
};

export default Questioneer;

const styles = StyleSheet.create({
  teXt: {
    fontSize: 14,
    color: Colors.mainBtnscolor,
    fontFamily: 'Poppins-Medium',
  },
  cArdstyle: {
    padding: 20,
    elevation: 0,
    borderRadius: 10,
    backgroundColor: '#ECF6F4',
  },
});

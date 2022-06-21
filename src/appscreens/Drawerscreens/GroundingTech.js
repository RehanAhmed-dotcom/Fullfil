import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import {Card} from 'native-base';
const GroundingTech = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Grounding Methods',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: Colors.mainBtnscolor,
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
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingTop: 12,
      }}>
      {[
        {name: '5-4-3-2-1 Grounding Method', nav: 'Method'},
        {name: 'Box Breathing', nav: 'boxBreath'},
      ].map((item, index) => (
        <>
          <TouchableOpacity
            key={index + 'a'}
            onPress={() => navigation.navigate(item.nav)}
            // onPress={() => {
            //   if (index == 0) {
            //     navigation.navigate('BodyApreciationscale', {cat: index + 1});
            //   } else if (index == 1)
            //     navigation.navigate('Inuativescale', {cat: index + 1});
            //   else if (index == 2)
            //     navigation.navigate('Inuativescale', {cat: index + 1});
            // }}

            // onPress={() =>
            //   index == 0
            //     ? navigation.navigate('BodyApreciationscale', {cat: index + 1})
            //     : navigation.navigate('Inuativescale', {cat: index + 1})
            // }
          >
            <Card style={styles.cArdstyle}>
              <Text style={styles.teXt}>{item.name}</Text>
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

export default GroundingTech;
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

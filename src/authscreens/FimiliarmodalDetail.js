import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../constants/colors';
const FimiliarmodalDetail = ({navigation, route}) => {
  const {
    firName,
    lastName,
    eMail,
    userName,
    password,
    date,
    handleDatacheck,
    handleEatedDatacheck,
  } = route.params;
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
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HealthAssesment', {
              firName,
              lastName,
              eMail,
              userName,
              password,
              date,
              handleDatacheck,
              handleEatedDatacheck,
            })
          }>
          <Image
            source={require('../assets/icon_cross.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              marginRight: 16,
            }}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        elevation: 0,
        backgroundColor: Colors.bgColor,
      },
    });
  }, []);

  return (
    <ScrollView>
      <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 24,
              color: Colors.mainBtnscolor,
              fontFamily: 'Poppins-Bold',
            }}>
            Intuitive Eating
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: Colors.mainBtnscolor,
          }}>
          Intuitive Eating is an evidenced-based approach to eating that
          integrates emotion, instinct and rational thought. This self-care
          eating framework is based on 10 principles and was created back in
          1995 by two dietitians, Evelyn Tribole and Elyse Resch. Intuitive
          Eating is a weight-neutral model and is backed by 150 studies to date.
          This approach allows the individual to honor their health by tuning
          back into the body and responding to the messages it gives them in
          order to meet their needs.
        </Text>

        <Text
          style={{
            marginTop: 14,
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: Colors.mainBtnscolor,
            // color: '#0A0D47',
          }}>
          The dynamic and personal processes include the following pricipals
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,

            // marginTop: 15,
          }}>
          1. Reject the Diet Mentality
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          2. Honor Your Hunger
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          3. Make Peace with Food
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          4. Challenge the Food police
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          5. Discover the Satisfication Factor
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          6. Feel Your Fullness
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          7. Cope Your Emotions with Kindness
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          8. Respect Your Body
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          9. Movement - Feel the Difference
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          10. Gentle Nutrition
        </Text>
        <View style={{marginTop: 14}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            These principles work together to help you break down rules and old
            beliefs that you may have picked up from the media, a well-meaning
            family member, or through years of dieting. Instead, it teaches you
            how to cultivate a more supportive inner dialogue and build trust in
            the body to provide the necessary feedback to meet your biological
            and psychological needs.
          </Text>
        </View>
        <Text
          style={{
            marginTop: 15,
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            // color: '#0A0D47',
            color: Colors.mainBtnscolor,
          }}>
          Intuitive Eating has been associated with improved physical and mental
          health outcomes such as:{' '}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Higher self-esteem
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Improved body-trust
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Increased satisfaction with life
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Improved body image
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Optimism and well-being
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Reduced guilt/shame around eating
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Proactive coping skills
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Lower rates of emotional eating
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Lower rates of disordered eating
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Higher HDL (good) cholesterol levels
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 25, color: Colors.mainBtnscolor, marginRight: 5}}>
            .
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              // color: '#0A0D47',
              color: Colors.mainBtnscolor,
            }}>
            Lower Triglyceride levels
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FimiliarmodalDetail;

const styles = StyleSheet.create({});

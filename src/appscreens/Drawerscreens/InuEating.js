import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Button from '../../components/Button';
import Pdf from 'react-native-pdf';
import Colors from '../../constants/colors';
import {pdf, intuativepdf} from '../../lib/api';
import RNFetchBlob from 'rn-fetch-blob';
const InuEating = ({navigation}) => {
  const [PDF, setPDF] = useState('');
  useEffect(() => {
    navigation.setOptions({
      title: 'Intuitive Eating',
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
  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };
  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = PDF;
    // Function to get extention of the file url
    let file_ext = '.pdf';

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    if (Platform.OS === 'ios') {
      // let dirs = RNFetchBlob.fs.dirs;
      // console.log('directory', dirs.DownloadDir);
      const {dirs} = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

      //   const configfb = {
      //   fileCache: true,
      //   useDownloadManager: true,
      //   notification: true,
      //   mediaScannable: true,
      //   title: FILE_URL.pdf,
      //   path: `${dirToSave}/${FILE_URL.pdf}`,
      // };
      // const configOptions = Platform.select({
      //   ios: {
      //     fileCache: configfb.fileCache,
      //     title: configfb.title,
      //     path: configfb.path,
      //     appendExt: 'pdf',
      //   },
      //   android: configfb,
      // });
      const filePath = `${dirToSave}/${FILE_URL}`;
      RNFetchBlob
        // RNFetchBlob.config({
        //   path:
        //     dirs.DocumentDir +
        //     '/file_' +
        //     Math.floor(date.getTime() + date.getSeconds() / 2) +
        //     '.pdf',
        // })
        .fetch('GET', FILE_URL)
        .then(res => {
          RNFetchBlob.fs.writeFile(filePath, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(filePath);
          // console.log('res of ios download', JSON.stringify(res.path));
        })
        .catch(e => {
          console.log('error', e.message);
        });
    } else {
      config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
          // Alert after successful downloading
          RNFetchBlob.ios.openDocument(res.data);
          console.log('res -> ', JSON.stringify(res));
          alert('File Downloaded Successfully.');
        });
    }
  };
  useEffect(() => {
    intuativepdf().then(res => {
      setPDF(res.link);
      console.log('res', res);
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: '90%',
          //   backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pdf
          source={{
            uri: PDF,
            cache: true,
          }}
          // onLoadComplete={(numberOfPages, filePath) => {
          //   console.log(`number of pages: ${numberOfPages}`);
          // }}
          // onPageChanged={(page, numberOfPages) => {
          //   console.log(`current page: ${page}`);
          // }}
          // onError={error => {
          //   console.log(error);
          // }}
          // onPressLink={uri => {
          //   console.log(`Link presse: ${uri}`);
          // }}
          style={{
            flex: 1,
            // backgroundColor: 'red',
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topContainer}>
          <View style={{paddingHorizontal: 18, paddingVertical: 12}}>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              Intuitive Eating is an evidenced-based approach to eating that
              integrates emotion, rational thought and instinct. The eating
              framework is based on 10 principles and was created in 1995 by two
              dietitians, Evelyn Tribole and Elyse Resch. Intuitive Eating is a
              weight-neutral model, aligned with Health At Every Size and is
              backed by over almost 150 studies to date. This framework helps
              the individual honor their health by tuning back into their body
              and responding to the messages it gives them.
            </Text>
            <Text style={{marginTop: 14, fontFamily: 'Poppins-Regular'}}>
              This dynamic process includes the following 10 principles:
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', marginTop: 20}}>
              1. Reject the Diet Mentality
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              2. Honor Your Hunger
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              3. Make Peace with Food
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              4. Challenge the Food police
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              5. Discover the Satisfication Factor
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              6. Feel Your Fullness
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              7. Cope Your Emotions with Kindness
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              8. Respect Your Body
            </Text>

            <Text style={{fontFamily: 'Poppins-Regular'}}>
              9. Movement Feel the Difference
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              10. Honor Your Health with Gentle Nutrition
            </Text>
            <View style={{marginTop: 14}}>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                These principles work together to help the individual break down
                rules and old beliefs that they may have picked up from the
                media, a well-meaning family member, or through years of
                dieting. It teaches them how to cultivate a more supportive
                inner dialogue and build trust in the body to provide necessary
                feedback in order to meet their biological and psychological
                needs.
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Intuitive Eating has been associated with improved physical and
                mental health outcomes such as:
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular', marginTop: 20}}>
                Higher self-esteem
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Improved body-trust
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Increased satisfaction with life
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Improved body image
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Optimism and well-being
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Reduced guilt/shame around eating
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Proactive coping skills
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Lower rates of emotional eating
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Lower rates of disordered eating
              </Text>

              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Higher HDL (good) cholesterol levels
              </Text>
              <Text style={{fontFamily: 'Poppins-Regular'}}>
                Lower Triglyceride levels
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>*/}
      <View
        style={{
          paddingBottom: 12,
          paddingHorizontal: 16,
          marginBottom: Platform.OS === 'ios' ? 10 : 0,
        }}>
        <Button onPress={() => checkPermission()} title={'Download PDF'} />
      </View>
      {/* <View style={styles.bottomContainer}>

            </View> */}
    </View>
  );
};

export default InuEating;

const styles = StyleSheet.create({
  topContainer: {
    flex: 5,
    //backgroundColor: 'green'
  },
  bottomContainer: {
    flex: 0.2,
    backgroundColor: 'blue',
  },
});

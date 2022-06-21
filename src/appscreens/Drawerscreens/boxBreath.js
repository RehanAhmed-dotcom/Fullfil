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
import Colors from '../../constants/colors';
import Pdf from 'react-native-pdf';
import {boxpdf} from '../../lib/api';
import RNFetchBlob from 'rn-fetch-blob';
const boxBreath = ({navigation}) => {
  const [PDF, setPDF] = useState('');
  console.log('pdf', PDF);
  useEffect(() => {
    navigation.setOptions({
      title: 'BOX BREATHING',
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
  useEffect(() => {
    boxpdf().then(res => {
      setPDF(res.link);
    });
  }, []);
  console.log('dfsf', PDF);
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
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/green.png')}
                style={{
                  height: 300,
                  width: 300,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: Colors.mainBtnscolor,
              }}>
              Box breathing, or square breathing, is a great way to reduce
              stress levels and calm the nervous system. Start by exhaling all
              of the air from your lungs. Then begin inhaling through your nose
              to the count of four. Hold your breath for 4 seconds and then
              exhale through your mouth. Hold again for another 4 seconds before
              repeating the process. Repeat for 4 rounds or for as long as you
              need. Use this breathing technique in times of high stress,
              anxiety or when you need a moment to center yourself.
            </Text>
          </View>
        </View>
      </ScrollView> */}
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

export default boxBreath;

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

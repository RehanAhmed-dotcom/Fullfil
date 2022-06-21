import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Colors from '../../constants/colors';

import Pdf from 'react-native-pdf';
import {pdf} from '../../lib/api';
import RNFetchBlob from 'rn-fetch-blob';
const HungerAndFullnes = ({navigation}) => {
  // const {check} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: 'Hunger/Fullness Scale',
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
        <TouchableOpacity
          // onPress={() => }
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={{height: 30, width: 30, borderRadius: 10, marginLeft: 16}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const [PDF, setPDF] = useState('');
  const DocumentDirectoryPath = 'data/com.fullfillapp/files';
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
  console.log('pdf', PDF);
  const downloadPDF = async (url, fileName) => {
    //Define path to store file along with the extension
    const path = `${DocumentDirectoryPath}/${fileName}.pdf`;
    const headers = {
      Accept: 'application/pdf',
      'Content-Type': 'application/pdf',
      // Authorization: `Bearer [token]`,
    };
    //Define options
    const options = {
      fromUrl: url,
      toFile: path,
      headers: headers,
    };
    //Call downloadFile
    const response = await downloadFile(options);
    return response.promise.then(async res => {
      //Transform response
      if (res && res.statusCode === 200 && res.bytesWritten > 0 && res.path) {
        doSomething(res);
      } else {
        logError(res);
      }
    });
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
    pdf().then(res => {
      setPDF(res.link);
    });
  }, []);
  // console.log(PDF);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
      }}>
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
      {/* <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 4, paddingTop: 12, paddingBottom: 12}}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              // height: 30,
            }}>
            
            <Image
              resizeMode="contain"
              source={require('../../assets/hunger.png')}
              style={{height: 250, marginTop: 10, width: '100%'}}
            />
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
              <Text
                style={{
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                First things first, this scale is not intended to be applied
                through an all-or-nothing lens. Remember, Intuitive Eating is
                not a hunger/fullness diet. Honoring your hunger and feeling
                your fullness are only 2 of the 10 principles of Intuitive
                Eating. It's quite common for frequent dieters to feel out of
                touch with their hunger and fullness cues. This is because
                dieting teaches us to rely on external factors to tell us when,
                what and how much to eat. When we do this for an extended period
                of time, our hunger and fullness cues go "offline".
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
              <Text
                style={{
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                You can use this scale as a tool to help you get back touch with
                these cues. Please keep in mind, there are some things that can
                interfere with your ability to feel your hunger and fullness
                cues. For example: stress, mood disorders, certain medications,
                disordered eating, eating disorders, digestive disorders, and
                even after a strenuous workout.
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
              <Text
                style={{
                  color: Colors.mainBtnscolor,
                  fontFamily: 'Poppins-Regular',
                }}>
                If you are waiting to eat until you are a 1-2 on the scale, you
                will likely eat very quickly, potentially missing out on the
                satisfaction of the meal and wind up in a place where you feel
                uncomfortably full. If you (for the most part) start eating
                around a 3-4, you'll likely be able to eat at a pace at which
                you are able to enjoy the sensory aspects of the meal, and leave
                the table feeling physically comfortable and satisfied.
              </Text>
            </View>
          </View>

          <View style={{height: 20}} />

          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              // height: 30,
            }}>
            
            <View
              style={{
                // height: 40,
                width: '100%',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'Poppins-Medium',
                  color: Colors.mainBtnscolor,
                  marginTop: 10,
                }}>
                Mindfulness
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'Poppins-Medium',
                  color: Colors.mainBtnscolor,
                }}>
                Around Eating
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                // alignContent: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  // fontSize: 30,
                  fontFamily: 'Poppins-Regular',
                  color: Colors.mainBtnscolor,
                }}>
                How often do you really check in with your body and ask yourself
                what it is you truly need? Often times we eat out of boredom,
                stress, anger, frustration or low energy. When we tune in and
                identify our true needs, we may find that we are using food to
                cope with something else. For example, perhaps you ate an hour
                ago, and are pretty full but find yourself turning to food to
                alleviate boredom, stress or sadness. By bringing awareness to
                your internal cues, you can learn to eat more intuitively,
                giving your body what it wants and needs.
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
              <Text
                style={{
                  // fontSize: 30,
                  fontFamily: 'Poppins-Regular',
                  color: Colors.mainBtnscolor,
                }}>
                Throughout the day, check in with yourself and ask “How am I
                feeling right now?” “Am I stressed or light headed? Bored or
                angry? "Is my stomach growling?” "Do I notice any other
                sensations?" These frequent check-in’s create more mindfulness
                around food and life in general.
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
              <Text
                style={{
                  // fontSize: 30,
                  fontFamily: 'Poppins-Regular',
                  color: Colors.mainBtnscolor,
                }}>
                Take a deep breath and belly check before you eat, ask yourself:
                “Am I hungry?" "What’s my hunger level?" "What am I hungry for?”
                While you are eating, investigate your hunger throughout your
                meal, ask yourself: “Has my body had enough?” “Am I eating just
                because there’s more food?” “Can I stop before I get
                uncomfortably full?” “How will I feel in 30, 60, 90 minutes
                after eating this?” “How do I want to feel for the rest of the
                day?”
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
              <Text
                style={{
                  // fontSize: 30,
                  fontFamily: 'Poppins-Regular',
                  color: Colors.mainBtnscolor,
                }}>
                The feelings of hunger and satiety may be hard to identify at
                first. Keep checking and you will learn more about your body and
                what it wants and needs.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>*/}
      <View
        style={{
          flex: 1,
          paddingBottom: 60,
          marginBottom: Platform.OS === 'ios' ? 10 : 0,
        }}>
        <Button onPress={() => checkPermission()} title={'Download PDF'} />
      </View>
    </View>
  );
};

export default HungerAndFullnes;

const styles = StyleSheet.create({});

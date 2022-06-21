import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Card } from 'native-base'
import Button from './Button';
import Colors from '../constants/colors'
function ModalBox({
    isModalVisible,
    setModalVisible,
    myText,
    navigation
}) {
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        navigation.navigate('FimiliarModal')
    };

    return (
        <View style={{ flex: 1, }}>
            <Modal isVisible={isModalVisible}>
                <Card style={{ borderRadius: 6, paddingVertical: 12 }}>
                    <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
                        <Image source={require('../assets/smiley.png')} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                        <Text style={{ paddingVertical: 6, fontSize: 18, textAlign: 'center' }}>{myText}</Text>
                    </View>
                    <View style={{ height: 14 }} />
                    <View style={{ paddingHorizontal: 24, paddingVertical: 18 }}>
                        <Button
                            title={'Learn More'}
                        />
                        <View style={{ height: 20 }} />
                        <Button
                            title={'Skip'}
                            onPress={toggleModal}
                            titlstyle={{ color: Colors.mainBtnscolor }}
                            style={{ backgroundColor: '#fff', borderWidth: .5, borderColor: Colors.mainBtnscolor }}
                        />
                    </View>


                </Card>
                {/* <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>

                    <Button title="Hide modal" onPress={toggleModal} />
                </View> */}
            </Modal>
        </View>
    );
}

export default ModalBox;
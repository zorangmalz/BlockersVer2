import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const WIDTH = Dimensions.get('window').width;

const community = StyleSheet.create({
    buttonbox: {
        width: 52,
        height: 24,
        borderRadius: 5,
        backgroundColor: '#5cc27b',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        margin: 16
    },
    buttontext: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    titlebox: {
        paddingLeft: 32,
        borderWidth: 0.5,
        borderColor: '#707070',
        alignItems: 'flex-start'
    },
    titleandcontent: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666666',
    },
    contentbox: {
        paddingLeft: 32,
        alignItems: 'flex-start',
        height: WIDTH*1.2,
        borderBottomWidth: 0.5,
        borderColor: '#707070',
    },
    picturetext: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'normal'
    }
})

export default function CommunityWrite ({navigation}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageOne, setImageOne] = useState(undefined);
    const [picone, setPicone] = useState(true);
    const [imageTwo, setImageTwo] = useState(undefined);
    const [pictwo, setPictwo] = useState(true);
    const [imageThree, setImageThree] = useState(undefined);
    const [picthree, setPicthree] = useState(true);

    const options = {
        title: '사진가져오기',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };

    const showCameraRoll1 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);
          }
          else {
            setImageOne(response.uri);
            setPicone(false);
          }
        });
    };

    const showCameraRoll2 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);
          }
          else {
            setImageTwo(response.uri);
            setPictwo(false);
          }
        });
    };

    const showCameraRoll3 = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);
          }
          else {
            setImageThree(response.uri);
            setPicthree(false);
          }
        });
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <TouchableOpacity style={community.buttonbox}
                        onPress={() => {
                            (title.length > 0) && (content.length > 0) ?
                                navigation.navigate('CommunityScreen')
                                :
                                Alert.alert(
                                    '작성 오류',
                                    '제목 본문 한글자 이상 작성해주세요.',
                                    [
                                        {
                                            text: 'OK', onPress: () => console.log('OK Pressed')
                                        }
                                    ]
                                )
                        }}>
                        <Text style={community.buttontext} >완료</Text>
                    </TouchableOpacity>
                    <View style={community.titlebox}>
                        <TextInput value={title} onChangeText={text => setTitle(text)} style={community.titleandcontent} placeholder="제목" placeholderTextColor="#707070" />
                    </View>
                    <View style={community.contentbox}>
                        <TextInput value={content} onChangeText={text => setContent(text)} style={community.titleandcontent} multiline={true} placeholder="내용" placeholderTextColor="#707070" />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        padding: 16,
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <TouchableOpacity onPress={showCameraRoll1} style={{
                            width: 92,
                            height: 92,
                            backgroundColor: '#E5E5E5',
                            marginRight: 16,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {imageOne && <Image resizeMode="stretch" source={{ uri: imageOne }} style={{ width: 92, height: 92 }} />}
                            {picone === true ? <Text style={community.picturetext}>Picture 1</Text> : <View /> }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showCameraRoll2} style={{
                            width: 92,
                            height: 92,
                            backgroundColor: '#E5E5E5',
                            marginRight: 16,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {imageTwo && <Image resizeMode="stretch" source={{ uri: imageTwo }} style={{ width: 92, height: 92 }} />}
                            {pictwo === true ? <Text style={community.picturetext}>Picture 2</Text> : <View /> }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showCameraRoll3} style={{
                            width: 92,
                            height: 92,
                            backgroundColor: '#E5E5E5',
                            marginRight: 16,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {imageThree && <Image resizeMode="stretch" source={{ uri: imageThree }} style={{ width: 92, height: 92 }} />}
                            {picthree === true ? <Text style={community.picturetext}>Picture 3</Text> : <View /> }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './HomeScreen';

const PersonalDetailsScreen = ({ navigation, route }) => {
    const initialUsername = route.params?.username || '';
    const initialEmail = route.params?.email || '';
    const [username, setusername] = useState(initialUsername);
    const [email, setemail] = useState(initialEmail);
    const [diachi, setDiaChi] = useState('');
    const [phone, setPhone] = useState("");
    

    const [showErrors, setshowErrors] = useState(false);
    const [errors, seterrors] = useState({});

    useEffect(() => {
        const getLoginInfo = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                const email = await AsyncStorage.getItem('email');
                if (username !== null && email !== null) {
                    setusername(username);
                    setemail(email);
                   
                }
            } catch (e) {
                console.log(e);
            }
        };

        getLoginInfo();
    }, []);

    
    const getErrors = (email, username, diachi, phone) => {
        const errors = {};

        

        if (!email) {
            errors.email = "Vui lòng nhập Email"
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.email = "Email không hợp lệ";
        }

        if (!username) {
            errors.username = "Vui lòng nhập Username"
        } else if (username.length < 6) {
            errors.username = "Username phải có tối thiểu 6 ký tư"
        }

    

        if (!diachi) {
            errors.diachi = "Vui lòng nhập địa chỉ"
        }

        if (!phone) {
            errors.phone = "Vui lòng nhập số điện thoại"
        } else if (phone.length !== 10) {
            errors.phone = "Số điện thoại phải có 10 số"
        } else if (isNaN(phone)) {
            errors.phone = 'Số điện thoại phải là số'

        }
        return errors;
    }

    


    const handelSave = async () => {
        const errors = getErrors(email, username, diachi, phone);

    
        if (Object.keys(errors).length > 0) {
            setshowErrors(true)
            seterrors(errors)
            console.log(errors);
        } else {
            const responseUser = await fetch(`${URL}/users`);
            const dataUser = await responseUser.json();
            const emailStorage = await AsyncStorage.getItem('email');
            const indexUser = dataUser.findIndex(item => item.email === emailStorage);
            if(indexUser !== -1){
                const response = await fetch(`${URL}/users/${dataUser[indexUser].id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
    
                const result = await response.json();
                if (result.id) {
                    seterrors({});
                    setshowErrors(false);
                    ToastAndroid.show('Thay thông tin thành công', ToastAndroid.SHORT);
                    navigation.goBack();
                }
            }
        }
        try {
            // Lưu thông tin đăng nhập vào AsyncStorage
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('email', email);
            
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: "white", ...StyleSheet.absoluteFillObject }}>
  <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
            <ScrollView>

                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>
                            <Image
                                source={require('../img/back1.png')}
                                style={styles.image1}
                                resizeMode="cover"
                            />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.cart}>Chỉnh sửa thông tin</Text>
                    </View>

                </View>



                <View style={styles.ImageContainer}>


                    <Image
                        source={require('../img/8.jpg')}
                        style={{ width: 150, height: 150, alignSelf: 'center', margin: 20, borderRadius: 100 }}
                        resizeMode="cover"
                    />

                </View>

                <Text style = {{color: 'black', alignSelf: 'center', fontSize: 17}}>Thông tin sẽ được lưu cho lần mua kế tiếp.</Text>
                <Text style = {{color: 'black', alignSelf: 'center', fontSize: 17}}>Bấm vào thông tin chi tiết để chỉnh sửa.</Text>


                <TextInput
                    style={styles.khung}
                    value={username}
                    onChangeText={(txt) => { setusername(txt) }}
                    placeholder="Nhập họ tên"
                    placeholderTextColor="gray"


                />

                {errors.username && (
                    <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                        {errors.username}
                    </Text>
                )}

                <TextInput
                    style={styles.khung}
                    value={email}
                    onChangeText={(txt) => { setemail(txt) }}
                    placeholder="Email"
                    placeholderTextColor="gray"


                />
                {errors.email && (
                    <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                        {errors.email}
                    </Text>
                )}


                

                <View>
                    <TextInput
                        style={styles.khung}
                        value={diachi}
                        onChangeText={(txt) => { setDiaChi(txt) }}
                        placeholder="Nhập địa chỉ"
                        placeholderTextColor="gray"
                        

                    />
                    {errors.diachi && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.diachi}
                        </Text>
                    )}

                
                </View>

                <View>
                    <TextInput
                        style={styles.khung}
                        value={phone}
                        onChangeText={(txt) => { setPhone(txt) }}
                        placeholder="Nhập số điện thoại"
                        placeholderTextColor="gray"
                        

                    />
                    {errors.phone && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.phone}
                        </Text>
                    )}

                </View>

                <TouchableOpacity
                onPress={() => handelSave()}
                style={styles.khungButton}

            >
                <Text style={{ color: "white", textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Lưu thông tin</Text>
            </TouchableOpacity>


            </ScrollView>

            </KeyboardAvoidingView>

           


        </SafeAreaView>
    )
}

export default PersonalDetailsScreen

const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 80,
        color: "black",
    },
    khung: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 20,
        color: "black",
        fontSize: 20
    },
    khungButton: {
        backgroundColor: "green",
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        margin: 15
    },


})
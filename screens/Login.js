import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './HomeScreen';
import CheckBox from '@react-native-community/checkbox';

const Login = (props) => {
    const { navigation } = props;
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, seterrors] = useState({});
    const [username, setUsername] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(() => {
        // Lấy thông tin tài khoản từ AsyncStorage khi màn hình được tạo
        const getAccountInfoFromStorage = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('savedEmail');
                const savedPassword = await AsyncStorage.getItem('savedPassword');
                if (savedEmail && savedPassword) {
                    setemail(savedEmail);
                    setpassword(savedPassword);
                    setToggleCheckBox(true); // Đánh dấu đã chọn tùy chọn "Nhớ tài khoản"
                }
            } catch (error) {
                console.log('Lỗi khi lấy thông tin tài khoản từ AsyncStorage:', error);
            }
        };
        getAccountInfoFromStorage();
    }, []);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };



    const doLogin = () => {

        const errors = getErrors(email, password);
        if (Object.keys(errors).length > 0) {

            seterrors(errors)

            return;

        } else {

            // thực hiện fetch lấy dữ liệu về
            let url_check_login = `${URL}/users?email=` + email;
            fetch(url_check_login)
                .then((res) => { return res.json(); })
                .then(async (res_login) => {
                    if (res_login.length != 1) {
                        seterrors({ email: 'Email không tồn tại' });
                    } else {
                        let objU = res_login[0];
                        if (objU.password !== password) {
                            seterrors({ password: 'Mật khẩu không đúng' });
                            return;
                        } else {
                            try {
                                const jsonString = JSON.stringify(objU);
                                await AsyncStorage.setItem('loginInfo', jsonString);
                                await AsyncStorage.setItem('username', objU.username); // Lưu username vào AsyncStorage
                                await AsyncStorage.setItem('email', email);
                                console.log(username);
                                  // Đăng nhập thành công, lưu thông tin tài khoản vào AsyncStorage nếu người dùng chọn tùy chọn "Nhớ tài khoản"
                if (toggleCheckBox) {
                    await AsyncStorage.setItem('savedEmail', email);
                    await AsyncStorage.setItem('savedPassword', password);
                } else {
                    // Xóa thông tin tài khoản trong AsyncStorage nếu người dùng không chọn tùy chọn "Nhớ tài khoản"
                    await AsyncStorage.removeItem('savedEmail');
                    await AsyncStorage.removeItem('savedPassword');
                }
                                seterrors({});
                                ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
                                props.navigation.navigate('DrawerNavigator');

                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }


                }


                )
        }

    }


    const getErrors = (email, password) => {
        const errors = {};

        if (!email) {
            errors.email = "Vui lòng nhập Email"
        } else if (!email.includes('@') || !email.includes('.')) {
            errors.email = "Email không hợp lệ";
        }

        if (!password) {
            errors.password = "Vui lòng nhập Password"
        } else if (password.length < 6) {
            errors.password = "Mật khẩu tối thiểu phải có 6 ký tự"
        }

        return errors;
    }

    return (
        <SafeAreaView style={st.background}>
            <KeyboardAvoidingView>
                <ScrollView>

                    {/* // Logo app */}

                    <View>
                        <Image

                            source={require('../img/12.jpg')}
                            style={{ width: 420, height: 370 }}
                        />
                    </View>
                    <Text style={st.welcom}>Chào mừng bạn</Text>
                    <Text style={st.welcom2}>Đăng nhập tài khoản</Text>

                    {/* // Nhập username */}
                    <TextInput
                        style={st.khung}
                        value={email}
                        onChangeText={(txt) => { setemail(txt) }}
                        placeholder="Nhập email"
                        placeholderTextColor="gray"
                    />

                    {errors.email && (
                        <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                            {errors.email}
                        </Text>
                    )}

                    {/* // Nhập password */}
                    <View>
                        <TextInput
                            style={st.khung}
                            value={password}
                            onChangeText={(txt) => { setpassword(txt) }}
                            placeholder="Mật khẩu"
                            placeholderTextColor="gray"
                            secureTextEntry={!showPassword}

                        />
                        {errors.password && (
                            <Text style={{ fontSize: 16, color: 'red', marginLeft: 20 }}>
                                {errors.password}
                            </Text>
                        )}

                        <TouchableOpacity
                            onPress={toggleShowPassword}
                            style={{ position: 'absolute', right: 40, top: 25 }}
                        >
                            <Image
                                source={showPassword ? require('../img/eye.png') : require('../img/eye1.png')}
                                style={{ width: 24, height: 24, tintColor: 'black' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between' }}>

                            <View style = {{flexDirection: 'row'}}>

                           
                        <CheckBox

                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style = {{top: 5}}>Nhớ tài khoản</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ color: 'green', top: 5 }}>Forgot Password ?</Text>
                        </TouchableOpacity>

                    </View>

                   




                    {/* // Button Login */}

                    <TouchableOpacity
                        // onPress={doLogin}
                        onPress={() => navigation.navigate('DrawerNavigator')}
                        style={st.khungButton}

                    >
                        <Text style={{ color: "white", textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <View style={st.container}>
                        <View style={st.line}></View>
                        <Text style={st.text}>Hoặc</Text>
                        <View style={st.line}></View>
                    </View>




                    {/* // Button Google */}



                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity
                        >
                            <Image
                                source={require('../img/icon_google.png')}
                                style={{ width: 30, height: 30 }}
                            />

                        </TouchableOpacity>

                        <TouchableOpacity
                        >
                            <Image
                                source={require('../img/icon_facebook.png')}
                                style={{ width: 30, height: 30, marginLeft: 30 }}
                            />

                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: "gray", fontWeight: 'bold', textAlign: 'center', marginTop: 15 }}>
                            Bạn không có tài khoản?</Text>

                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={{ color: "green", fontWeight: 'bold', marginTop: 15 }}> Tạo tài khoản</Text>
                        </TouchableOpacity>


                    </View>




                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default Login

const st = StyleSheet.create({
    background: { ...StyleSheet.absoluteFillObject, backgroundColor: "white" },
    welcom: { fontSize: 30, textAlign: "center", color: "black", fontWeight: 'bold' },
    welcom2: { fontSize: 20, textAlign: "center", color: "black", marginTop: 5, marginBottom: 10 },
    khung: { borderColor: "#C0C0C0", borderWidth: 1, borderRadius: 10, padding: 10, marginHorizontal: 20, marginVertical: 10, color: "black", fontSize: 18 },
    khungButton: { backgroundColor: "#007537", borderWidth: 1, borderRadius: 20, padding: 15, margin: 15 },
    khungButton1: { backgroundColor: "#FFFFFF", borderWidth: 1, borderRadius: 25, padding: 15, margin: 15, marginTop: 5 },

    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 10

    },
    line: {
        flex: 1,
        height: 1.5,
        backgroundColor: 'green',
    },
    text: {
        marginHorizontal: 10,
    },
})
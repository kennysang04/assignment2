import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native'
import React from 'react'

const ProfileScreen = ({navigation}) => {
    const handleLogout = () => {
        Alert.alert(
          'Xác nhận',
          'Bạn có chắc chắn muốn đăng xuất?',
          
          
          [
            {
              text: 'Hủy',
              onPress: () =>  ToastAndroid.show('Hủy', ToastAndroid.SHORT),
              style: 'cancel',
            },
            {
              text: 'Đăng xuất',
              onPress: () => {
                ToastAndroid.show('Đăng xuất thành công', ToastAndroid.SHORT),
                navigation.navigate('Login')
                
              }
                     
              
            },
          ],
          { cancelable: false }
        );
      };
    return (
        <View>
            <View style={styles.headerBar}>

                <Text style={styles.cart}>Thông Tin Tài Khoản</Text>

            </View>

            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Image
                    source={require('../img/8.jpg')}
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                />
                <View>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, marginLeft: 20,marginTop: 10 }}>Nguyễn Trọng Nam</Text>
                    <Text style={{ color: 'gray', fontSize: 15, marginLeft: 20, }}>nam@gmail.com</Text>
                </View>
            </View>

            {/* Chung */}

            <View style = {{margin: 20}}>

            <Text style = {{fontSize: 18}}>Chung</Text>
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

            <TouchableOpacity onPress={() => navigation.navigate('PersonalDetailsScreen')}>
                <Text style = {{marginTop: 10, fontSize: 18, color: 'black'}}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CamNang')}>
                <Text style = {{marginTop: 10, fontSize: 18, color: 'black'}}>Thông tin sản phẩm</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('OrderHistotyScreen')}>
                <Text style = {{marginTop: 10, fontSize: 18, color: 'black'}}>Lịch sử giao dịch</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('QA')}>
                <Text style = {{marginTop: 10, fontSize: 18, color: 'black'}}>Q & A</Text>
            </TouchableOpacity>
            </View>

            {/* Bảo mật */}

            <View style = {{margin: 20}}>

            <Text style = {{fontSize: 18}}>Bảo mật và Điều khoản</Text>
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

            <TouchableOpacity onPress={() => {}}>
                <Text style = {{marginTop: 10, fontSize: 18, color: 'black'}}>Điều khoản và điều kiện</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
                <Text style = {{marginTop: 10, fontSize: 18, color: 'black'}}>Chính sách quyền riêng tư</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
                <Text style = {{marginTop: 10, fontSize: 18, color: 'red'}}>Đăng xuất</Text>
            </TouchableOpacity>

            
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    headerBar: {
        alignSelf: 'center',
        margin: 20,
    },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        color: "black",

    },
})
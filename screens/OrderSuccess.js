import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { URL } from './HomeScreen';

const OrderSuccess = ({ navigation, route }) => {
    const { customerInfo, totalPrice, subtotal, shippingFee, shippingMethod } = route.params;
    const { username, email, sdt, address } = customerInfo;

    const onPayment = async () => {
        try {
            const responseCart = await fetch(`${URL}/carts`);
            const dataCart = await responseCart.json();
            // const listIdCart = dataCart.map(item => item.id);

            // Xóa các sản phẩm trong giỏ hàng sau khi đã thanh toán
            for (let i = 0; i < dataCart.length; i++) {
                const id = dataCart[i].id;
                await fetch(`${URL}/carts/${id}`, { method: 'DELETE' });
            }
    
            // Thêm thông tin đơn hàng vào orders
            for (let i = 0; i < dataCart.length; i++) {
                const element = dataCart[i];
                let totalPrice = 0; // Khai báo và gán giá trị cho totalPrice
                for (let j = 0; j < element.giaSP.length; j++) {
                    const { price, size } = element.giaSP[j];
                    totalPrice += Number(price) * (element.data[size] || 0);
                }
                if (totalPrice) {
                    await fetch(`${URL}/orders`, {
                        method: 'POST',
                        body: JSON.stringify({
                            idSP: element.idSP,
                            createAt: Date.now() + "",
                            data: element.data,
                            totalPrice: Number(totalPrice.toFixed(2)),
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                }
            }
        } catch (error) {
            console.error('Error in onPayment:', error);
            throw error; // Throw error to handle promise rejection
        }
    };
    
    
    return (
        <View>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <Image
                            source={require('../img/back1.png')}
                            style={{ width: 25, height: 25 }}
                            resizeMode="cover"
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.cart}>Thông báo</Text>

                <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                    <Image style={{ width: 25, height: 25 }}
                        resizeMode="cover"
                        source={require('../img/cart.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* Thông tin kh */}
            <View style={{ marginHorizontal: 20 }}>


                <Text style={{ color: 'green', alignSelf: 'center', fontSize: 17, }}>Bạn đã đặt hàng thành công</Text>



                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal', marginTop: 30 }}>Thông tin khách hàng</Text>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />
                <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal', marginTop: 15 }}>{username}</Text>
                <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal', marginTop: 10 }}>{email}</Text>
                <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal', marginTop: 10 }}>{address}</Text>
                <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal', marginTop: 10 }}>{sdt}</Text>

                <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
                <View style={styles.separator} />
                <Text style={styles.shippingMethodText}>{shippingMethod}</Text>
                <Text style={styles.deliveryEstimateText}>(Dự kiến giao hàng 10-15/3)</Text>


                {/* Hình thức thanh toán */}
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal', marginTop: 30 }}>Hình thức thanh toán</Text>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />
                <Text style={{ color: 'gray', fontSize: 18, fontWeight: 'normal', marginTop: 15 }}>Thẻ VISA/MASTERCREDIT</Text>


                {/* Đơn hàng đã chọn */}
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal', marginTop: 30 }}>Đơn hàng đã chọn</Text>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

            </View>
            {/* Thanh toán */}

            <View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginHorizontal: 20 }}>

                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal' }}>Đã thanh toán</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal' }}>{totalPrice} $</Text>
                </View>


                <TouchableOpacity onPress={ async () => {
                    await onPayment();
                    navigation.navigate('OrderHistotyScreen', { customerInfo,
                        totalPrice,
                        subtotal,
                        shippingFee,
                        shippingMethod})
                }}
                    style={{ backgroundColor: "green", width: '95%', margin: 10, borderRadius: 10}}>
                               <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, padding: 10, fontWeight: 'bold' }}>Lịch sử giao dịch </Text>
                </TouchableOpacity>


            </View>
        </View>


    )
}

export default OrderSuccess

const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: "black",
        marginTop: 10
    },
})
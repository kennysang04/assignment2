import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TouchableOpacity, Pressable, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { URL } from './HomeScreen';


const KienThuc = ({ navigation, route }) => {

    const { image, title, loaiSP, classify } = route.params;
    const [expanded, setExpanded] = useState(false);
    const [buoc1Expanded, setBuoc1Expanded] = useState(false);
    const [buoc2Expanded, setBuoc2Expanded] = useState(false);
    const [buoc3Expanded, setBuoc3Expanded] = useState(false);

    const [expanded1, setExpanded1] = useState(false);
    const [buoc4Expanded, setBuoc4Expanded] = useState(false);
    const [buoc5Expanded, setBuoc5Expanded] = useState(false);
    const [buoc6Expanded, setBuoc6Expanded] = useState(false);
    const [buoc7Expanded, setBuoc7Expanded] = useState(false);
    const [buoc8Expanded, setBuoc8Expanded] = useState(false);

    // Hàm để xử lý sự kiện khi nhấn vào dấu "+"
    const handleExpand = () => {
        setExpanded(!expanded); // Đảo ngược trạng thái mở rộng
    };
    const handleExpand1 = () => {
        setExpanded1(!expanded1); // Đảo ngược trạng thái mở rộng
    };

    const handleExpandBuoc1 = () => {
        setBuoc1Expanded(!buoc1Expanded);
    };

    const handleExpandBuoc2 = () => {
        setBuoc2Expanded(!buoc2Expanded);
    };

    const handleExpandBuoc3 = () => {
        setBuoc3Expanded(!buoc3Expanded);
    };

    const handleExpandBuoc4 = () => {
        setBuoc4Expanded(!buoc4Expanded);
    };

    const handleExpandBuoc5 = () => {
        setBuoc5Expanded(!buoc5Expanded);
    };

    const handleExpandBuoc6 = () => {
        setBuoc6Expanded(!buoc6Expanded);
    };

    const handleExpandBuoc7 = () => {
        setBuoc7Expanded(!buoc7Expanded);
    };

    const handleExpandBuoc8 = () => {
        setBuoc8Expanded(!buoc8Expanded);
    };



    return (
        <View style={styles.container}>


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
                <Text style={styles.cart}>{title}</Text>

                
            </View>

            <Image
                source={{ uri: image }}
                style={styles.headerImage}
            />

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ backgroundColor: 'green', width: '30%',textAlign: 'center', padding: 5, color: 'white', marginHorizontal: 30, paddingLeft: 13, marginVertical: 20 }}>{loaiSP}</Text>
                { classify ? <Text style={{ backgroundColor: 'green', width: '30%', padding: 5, textAlign: 'center',color: 'white', marginHorizontal: 30, paddingLeft: 13, marginVertical: 20 }}>{classify}</Text>
: null}
            </View>
            <View style={{ marginHorizontal: 30 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal' }}>Thông tin sản phẩm</Text>
                    <TouchableOpacity onPress={handleExpand}>
                        <Text style={{ color: 'green', fontSize: 25, fontWeight: 'normal' }}>{expanded ? '_' : '+'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Hiển thị các bước nếu được mở rộng */}
                {expanded && (
                    <View style={styles.buocContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.buoc}>Kiểu Dáng</Text>
                            <TouchableOpacity onPress={handleExpandBuoc1}>
                                <Image source={require('../img/arrow.png')}
                                    style={{ top: 5 }} />
                            </TouchableOpacity>
                        </View>
                        {buoc1Expanded && (
                            <View>
                                <ScrollView style={{ maxHeight: 200 }}>
                                    <Text style={styles.buocContent}>
                                    Áo sơ mi thường có kiểu dáng cổ điển với nút cài phía trước, cổ áo có thể là cổ bẻ, cổ bẻ tà, hoặc cổ thẳng. Có nhiều kiểu dáng khác nhau như áo sơ mi cột nơ, áo sơ mi dài tay, áo sơ mi ngắn tay, áo sơ mi ôm body, và áo sơ mi dáng rộng.ø
                                        </Text>
                                </ScrollView>
                            </View>
                        )}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.buoc}>Chất Liệu</Text>
                            <TouchableOpacity onPress={handleExpandBuoc2}>
                                <Image source={require('../img/arrow.png')}
                                    style={{ top: 5 }} />
                            </TouchableOpacity>
                        </View>

                        {buoc2Expanded && (
                            <View>
                                <ScrollView style={{ maxHeight: 200 }}>
                                    <Text style={styles.buocContent}>
                                    Áo sơ mi có thể được làm từ nhiều loại chất liệu khác nhau như cotton, lụa, lanh, polyester, và các loại vải tổng hợp khác. Chất liệu thường phụ thuộc vào mục đích sử dụng và phong cách thiết kế của áo.ø
                     </Text>
                                </ScrollView>
                            </View>
                        )}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.buoc}>Màu sắc và hoa văn</Text>

                            <TouchableOpacity onPress={handleExpandBuoc3}>
                                <Image source={require('../img/arrow.png')}
                                    style={{ top: 5 }} />
                            </TouchableOpacity>
                        </View>
                        {buoc3Expanded && (
                            <View>
                                <ScrollView style={{ maxHeight: 200 }}>
                                    <Text style={styles.buocContent}>
                                    Áo sơ mi có sẵn trong một loạt các màu sắc và hoa văn khác nhau, từ màu trơn đơn giản đến các hoa văn in hoặc kẻ caro. Màu sắc và hoa văn cũng có thể phản ánh phong cách và cá nhân của người mặc.ø
                                   </Text>
                                </ScrollView>
                            </View>
                        )}
                        
                        
                    </View>
                )}



            </View>


        </View>

    )
}

export default KienThuc

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flex: 7,

    },
    headerImage: {
        width: '100%',
        height: '35%',
        resizeMode: 'cover',

    },

    headerText: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },

    body: {
        borderRadius: 20,
        margin: 20,
        backgroundColor: 'white'


    },
    tripInfo: {
        fontSize: 15,
        lineHeight: 24,
        fontWeight: 'normal',
        color: 'black',
        marginTop: 10,
        height: 70,

    },
    footer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        paddingVertical: 10,

    },
    price: {
        flex: 2,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    bookButton: {
        marginHorizontal: 20,
        backgroundColor: 'green',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 15,
        marginTop: 20


    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',

    },

    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    cart: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: "black",
        marginTop: 10,
        marginLeft: 100
    },
    image1: {
        width: 40,
        height: 40,
        marginRight: 120,
        marginLeft: 10,
        borderRadius: 10,
        marginBottom: 5
    },
    buocContainer: {
        marginTop: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    buoc: {
        color: 'gray',
        fontSize: 18,
        fontWeight: 'normal',
    },
    buocContent: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 20,
        marginBottom: 10,
    },
})
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

const QA = ({navigation}) => {
    const [buoc1Expanded, setBuoc1Expanded] = useState(false);
    const [buoc2Expanded, setBuoc2Expanded] = useState(false);
    const [buoc3Expanded, setBuoc3Expanded] = useState(false);
    const [buoc4Expanded, setBuoc4Expanded] = useState(false);
    const [buoc5Expanded, setBuoc5Expanded] = useState(false);

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
                <Text style={styles.cart}>Q&A</Text>
            </View>

            <View style={{ margin: 20 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.buoc}>Quần áo yêu thích của bạn là gì và tại sao?</Text>

                    <TouchableOpacity onPress={handleExpandBuoc1}>
                        <Image source={require('../img/arrow.png')}
                            style={{ top: 35 }} />
                    </TouchableOpacity>
                </View>
                {buoc1Expanded && (
                    <View>
                        <ScrollView style={{ maxHeight: 200 }}>
                            <Text style={styles.buocContent}>Áo sơ mmi là một trong những loại quần áo yêu thích của tôi vì nó thoải mái và dễ phối đồ.</Text>
                        </ScrollView>
                    </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.buoc}>Bạn có một bộ sưu tập quần áo nào đặc biệt không?</Text>

                    <TouchableOpacity onPress={handleExpandBuoc2}>
                        <Image source={require('../img/arrow.png')}
                            style={{ top: 35 }} />
                    </TouchableOpacity>
                </View>
                {buoc2Expanded && (
                    <View>
                        <ScrollView style={{ maxHeight: 200 }}>
                            <Text style={styles.buocContent}>Tôi có một bộ sưu tập áo sơ mi vintage mà tôi đã sưu tập từ các cửa hàng đồ cũ, với mỗi mẫu áo mang đến một câu chuyện và phong cách riêng.</Text>
                        </ScrollView>
                    </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.buoc}>Bạn thích mặc loại quần áo nào nhất: áo thun, áo sơ mi, áo khoác, hay áo len? Và tại sao?</Text>

                    <TouchableOpacity onPress={handleExpandBuoc3}>
                        <Image source={require('../img/arrow.png')}
                            style={{ top: 35 }} />
                    </TouchableOpacity>
                </View>
                {buoc3Expanded && (
                    <View>
                        <ScrollView style={{ maxHeight: 200 }}>
                            <Text style={styles.buocContent}>Tôi thích áo sơ mi nhất vì nó không chỉ thoải mái mà còn sang trọng và dễ phối đồ với nhiều trang phục khác nhau.</Text>
                        </ScrollView>
                    </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.buoc}>Bạn có bất kỳ bí quyết nào để chăm sóc quần áo một cách hiệu quả không?</Text>

                    <TouchableOpacity onPress={handleExpandBuoc4}>
                        <Image source={require('../img/arrow.png')}
                            style={{ top: 35 }} />
                    </TouchableOpacity>
                </View>
                {buoc4Expanded && (
                    <View>
                        <ScrollView style={{ maxHeight: 200 }}>
                            <Text style={styles.buocContent}>Tôi thường giặt quần áo bằng nước lạnh để tránh co rút và phai màu, và luôn luôn làm khô quần áo hoàn toàn trước khi lưu trữ.</Text>
                        </ScrollView>
                    </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.buoc}>Trong quần áo của bạn, màu sắc nào là phổ biến nhất?</Text>

                    <TouchableOpacity onPress={handleExpandBuoc5}>
                        <Image source={require('../img/arrow.png')}
                            style={{ top: 35 }} />
                    </TouchableOpacity>
                </View>
                {buoc5Expanded && (
                    <View>
                        <ScrollView style={{ maxHeight: 200 }}>
                            <Text style={styles.buocContent}> Màu sắc phổ biến nhất trong tủ đồ của tôi là màu xanh navy vì nó dễ phối đồ và trang nhã.</Text>
                        </ScrollView>
                    </View>
                )}

            </View>
        </View>
    )
}

export default QA

const styles = StyleSheet.create({
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
        marginLeft: 150
    },
    buocContent: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10

    },
    buoc: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'normal',
        marginTop: 30
    },
})
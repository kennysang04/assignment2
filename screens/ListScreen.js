import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { URL } from './HomeScreen'

const ListScreen = ({ navigation, route }) => {
    const { title } = route.params;
    const [section, setSection] = useState([{ title: "Tất cả", id: 1, hide: true, loaiSP: "Sơ Mi" }, { title: "Hàng Châu Âu", loaiSP: "Quần Bò Jean", id: 4 }, { title: "Hàng Mới Nhập", loaiSP: "Sơ Mi", id: 5 }, { title: "Hàng Châu Âu", loaiSP: "Sơ Mi", id: 6 }]);
    const [danhSach, setDanhSach] = useState([]);
    const [initData, setInitData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);




    useEffect(() => {
        // Fetch dữ liệu từ API ở đây        
        // Ví dụ sử dụng fetch:
        fetch(`${URL}/products`)
            .then((response) => response.json())
            .then((data) => {
                // Kiểm tra xem data có tồn tại và có thuộc tính products không
                if (data) {
                    const newData = data.filter((item) => {
                        return item.loaiSP === title;
                    })
                    setDanhSach(newData);
                    setInitData(newData);
                } else {
                    console.error('Dữ liệu không hợp lệ:', data);
                }
            })
            .catch((error) => console.error('Lỗi khi fetch dữ liệu:', error));
    }, []);



    const handleSection = (index) => {
        if (index === 0) {
            setSection(section.map((item, position) => ({ ...item, hide: position === index ? true : false })))
        } else {
            const sectionNew = section.map(item => ({ ...item, hide: true }))
            sectionNew[index].hide = false
            setSection(sectionNew);
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
                <Text style={styles.cart}>{title}</Text>

                <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                    <Image style={{ width: 25, height: 25 }}
                        resizeMode="cover"
                        source={require('../img/cart.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.menu}>
                <ScrollView
                    horizontal={true}>

                    {section.filter((item) => item.loaiSP === title)
                        .map((item, index) => (
                            <TouchableOpacity key={item.id} onPress={() => { handleSection(index); setSelectedItem(item.id); }}>


                                <View style={[styles.item, selectedItem === item.id && styles.selectedItem]}>
                                    <Text style={[styles.text, selectedItem === item.id && styles.selectedText]}>{item.title}</Text>

                                </View>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>

          
                {(section.filter(item => item.loaiSP === title).length ? section.filter(item => item.loaiSP === title) : [section[0]]) 
                    .map((element, index) => {
                        const condition = element.id === selectedItem;

                        const list = danhSach.filter(obj => {

                            return condition ? obj.phanLoai === element.title : ((selectedItem == null || selectedItem === 1) ? true : false)
                        });

                        return !list.length ? null : (


                            <View key={element.id}>

                                {section.find((e) => e.loaiSP === title) ? <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginLeft: 20 }}>{element.title}</Text> : null}
                                
                                <FlatList
                            
                                    data={list}
                                    keyExtractor={(item) => parseInt(item.id, 10).toString()}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                        <View style={styles.productItem}>
                                            <TouchableOpacity

                                                onPress={() => {
                                                    const priceS = item.giaSP.find(price => price.size === 'M');
                                                    const price = priceS ? priceS.price + ' ' + priceS.currency : 'N/A'

                                                    navigation.navigate("DetailsScreen", { item, id: item.id, giaSP: item.giaSP, image: item.linkAnh, title: item.tenSP, price: price, loaiSP: item.loaiSP, origin: item.xuatXu, classify: item.phanLoai })
                                                }}
                                            >
                                                <Image
                                                    style={{ width: 180, height: 150, borderRadius: 7 }}
                                                    source={{ uri: item.linkAnh }} />
                                            </TouchableOpacity>

                                            <View style={styles.ngang}>
                                                <View style={{ width: 115, marginLeft: 5 }} >
                                                    <Text style={{ color: 'black', fontSize: 17, }}>{item.tenSP}</Text>
                                                    <Text>{item.phanLoai}</Text>
                                                    {item.giaSP.map((price) => (
                                                        price.size === 'M' ? (
                                                            <Text style={{ color: 'green', fontSize: 16, marginTop: 3, fontWeight: 'bold' }}>
                                                                {price.currency} {price.price}
                                                            </Text>
                                                        ) : null
                                                    ))}

                                                </View>

                                            </View>
                                        </View>
                                    )}
                                />


                            </View>
                        )
                    })}

          

        </View>
    )
}

export default ListScreen

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
    productItem: {

        marginLeft: 20,
        marginTop: 20,
        width: 180,
        height: 250,
        borderRadius: 10,
        backgroundColor: '#D3D3D3',
        borderBottomColor: 'black',
    },
    ngang: {
        marginTop: 10,
        flexDirection: 'row',
        marginLeft: 5,
    },
    menu: {
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,

    },

    item: {
        height: 40,
        marginHorizontal: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5,
    },

    image: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 30,


    },
    text: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'normal',
        color: 'gray'
    },

    selectedItem: {
        backgroundColor: 'green', // Màu nền của mục được chọn
    },
    selectedText: {
        color: 'white', // Màu chữ của mục được chọn
    },

})
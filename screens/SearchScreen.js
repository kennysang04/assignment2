import { StyleSheet, Text,ScrollView, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
export const URL = 'http://192.168.186.103:3000';


const SearchScreen = ({ navigation }) => {
  const [search, setsearch] = useState('');
  const [section, setSection] = useState([{ title: "Tất cả", id: 1, hide: true, loaiSP: "Sơ Mi" }, { title: "Hàng Mới Nhập", loaiSP: "Sơ Mi", id: 4 }, { title: "Hàng Mới Nhập", loaiSP: "Sơ Mi", id: 5 }, { title: "Hàng Châu Âu", loaiSP: "Sơ Mi", id: 6 }]);

  const [danhSach, setDanhSach] = useState([]);
  const [initData, setInitData] = useState([]);

  useEffect(() => {
    // Fetch dữ liệu từ API ở đây
    // Ví dụ sử dụng fetch:
    fetch(`${URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        // Kiểm tra xem data có tồn tại và có thuộc tính products không
        if (data) {
          setDanhSach(data);
          setInitData(data);
        } else {
          console.error('Dữ liệu không hợp lệ:', data);
        }
      })
      .catch((error) => console.error('Lỗi khi fetch dữ liệu:', error));
  }, []);

  const filteredProducts = () => initData.filter((product) => {
    if (product.tenSP && product.loaiSP && (product.tenSP.toLowerCase().includes(search.toLowerCase()) || product.loaiSP.toLowerCase().includes(search.toLowerCase()))) {
      return product;
    }
    return false;
  });

  const handleSearch = (value) => {
    setsearch(value);
    if (!value.trim()) {
      setDanhSach(initData)
    } else {
      setDanhSach(filteredProducts())
    }
  }

  return (
    <View>

      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ marginLeft: 20, marginTop: 20 }}>
            <Image
              source={require('../img/back1.png')}
              style={{ width: 25, height: 25 }}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.cart}>Tìm kiếm</Text>
        </View>
      </View>

      <View style={styles.InputContainer}>

        <TouchableOpacity onPress={() => { }}>

          <Image
            source={require('../img/search.png')}
            style={styles.InputIcon}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.search}
          value={search}
          onChangeText={handleSearch}
          placeholder="Tìm kiếm..."
          placeholderTextColor="black"

        />

      </View>

      {/* Hiển thị danh sách sản phẩm */}
      <ScrollView>
                {section.filter(item => !item.hide)
                    .map((element) => {
                        const list = danhSach.filter(obj => obj.loaiSP === element.title);
                        return !list.length ? null : (


                            <View key={element.id}>

                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 20 }}>{element.title}</Text>

                                <FlatList

                                    data={list}
                                    keyExtractor={(item) => parseInt(item.id, 10).toString()}
                                    horizontal={true}
                                    renderItem={({ item }) =>(
                                        <View style={styles.productItem}>
                                            <TouchableOpacity

                                                onPress={() => {
                                                    const priceS = item.giaSP.find(price => price.size === 'S' || price.size === '250gm');
                                                    const price = priceS ? priceS.price + ' ' + priceS.currency : 'N/A'

                                                    navigation.navigate("DetailsScreen", { item,id: item.id, giaSP: item.giaSP, image: item.linkAnh, title: item.tenSP, price: price, gia: item.giaSP, rate: item.danhGia, description: item.moTa })
                                                }}
                                            >
                                                <Image
                                                    style={{ width: 150, height: 150, borderRadius: 20, margin: 7 }}
                                                    source={{ uri: item.linkAnh }} />
                                            </TouchableOpacity>

                                            <View style={styles.ngang}>
                                                <View style={{ width: 115, marginLeft: 5 }} >
                                                    <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.tenSP}</Text>

                                                    {item.giaSP.map((price) => (
                                                        price.size === 'S' || price.size === '250gm' ? (
                                                            <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
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

            </ScrollView>
                </View>    
                    
                  )
                  }

                  export default SearchScreen

                  const styles= StyleSheet.create({
                  headerBar: {
                  flexDirection: 'row',
                alignItems: 'center'
      },
                cart: {
                  fontWeight: 'bold',
                fontSize: 22,
                marginLeft: 140,
                marginTop: 12,
                color: "black",

      },
                InputContainer: {
                  margin: 20,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "gray",
                alignItems: 'center',
                flexDirection: 'row',
    },

                InputIcon: {
                  marginHorizontal: 20,
    },

                search: {
                  flex: 1,
                height: 50,
                fontSize: 14,
                color: 'black'
    },
})
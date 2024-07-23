import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TouchableOpacity, Pressable, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { URL } from './HomeScreen';


const DetailsScreen = ({ navigation, route }) => {

  const { image, title, price, origin, giaSP, item, loaiSP, classify} = route.params;

  // State để lưu trữ kích thước hiện tại của sản phẩm (S, M, L)
  const [size, setSize] = useState('S');

  // yêu thích


  const [currentPrice, setCurrentPrice] = useState(price);

  const [cart, setCart] = useState([]);

 
  // Hàm để cập nhật kích thước khi người dùng chọn
  const handleSizeSelection = (data) => {
    setSize(data.size);
    if (data.price) {
      setCurrentPrice(data.price);
    } else {
      setCurrentPrice('N/A');
    }
  };

  const addToCart = async () => {
    const responseCart = await fetch(URL + "/carts");
    const dataCart = await responseCart.json();
    const cart = dataCart.find(element => element.idSP == item.id);
    let method = 'POST';
    let url = URL + "/carts";
    let body = {
      idSP: item.id,
      data: { [size]: "1" }
    }
    if (cart) {
      url = URL + "/carts/" + cart.id;
      method = 'PATCH';
      body = {
        idSP: item.id,
        data: { ...cart.data, [size]: Number(cart.data[size] || 0) + 1 + "" }
      }
    }
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
       navigation.navigate('CartScreen');
    } else {
      // Nếu có lỗi xảy ra, hiển thị toast thông báo lỗi
      ToastAndroid.show('Đã xảy ra lỗi khi thêm vào giỏ hàng', ToastAndroid.SHORT);
    }
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

        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Image style={{ width: 25, height: 25 }}
            resizeMode="cover"
            source={require('../img/cart.png')}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: image }}
        style={styles.headerImage}
      />

      <View style = {{flexDirection: 'row'}}>
      <Text style = {{backgroundColor: 'green', width: '30%',textAlign:'center', padding: 5, color: 'white', marginHorizontal: 30,paddingLeft: 13, marginVertical: 20}}>{loaiSP}</Text>
      {classify ? <Text style = {{backgroundColor: 'green', width: '30%', textAlign:'center',padding: 5, color: 'white', marginHorizontal: 30,paddingLeft: 13, marginVertical: 20}}>{classify}</Text> 
      : null}
      </View>
       <View style = {{marginHorizontal: 30}}>

          <Text style = {{color: 'green', fontSize: 30, marginBottom: 10, fontWeight: 'bold'}}>{currentPrice} </Text>

          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'normal' }}>Chi tiết sản phẩm</Text>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 5 }} />

         
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10  }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal' }}>Xuất xứ</Text>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal' }}>{origin}</Text>
          </View>

          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1,marginTop: 5 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10  }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal' }}>Tình trạng</Text>
            <Text style={{ color: 'green', fontSize: 18, fontWeight: 'normal' }}>Còn 156 sản phẩm</Text>
          </View>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1,marginTop: 5 }} />

          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'normal', marginTop: 15 }}>Kích cỡ</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
            {giaSP.map(item => {
              return <TouchableOpacity
                key={item.size}
                onPress={() => handleSizeSelection(item)}
                style={{ padding: 7, width: '20%', borderRadius: 10, marginTop: 20, borderColor: size === item.size ? 'orange' : 'gray', borderWidth: 2 }}
              >
                <Text style={{ color: 'black', textAlign: 'center' }}>{item.size}</Text>
              </TouchableOpacity>
            })}
          </View>
          </View>

        <View style = {{marginTop: 30}}>

          <View style={{ flexDirection: 'row' , justifyContent: 'space-between', marginHorizontal: 30}}>

              <Text style={{ color: 'black', fontSize: 20, marginRight: 200 }}>Tạm tính:</Text>
              <Text style={styles.priceText}>$ {currentPrice}</Text>
            </View>

      
        <TouchableOpacity onPress={addToCart}
          style={styles.bookButton}>
          <Text style={styles.buttonText}>Mua Hàng</Text>
        </TouchableOpacity>
        </View>
      </View>



    
  )
}

export default DetailsScreen

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10
  },
  cart: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: "black",
    marginTop: 10
  },
  image1: {
    width: 40,
    height: 40,
    marginRight: 120,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 5
  },
})
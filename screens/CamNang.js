import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity,Alert, FlatList, ToastAndroid ,} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { URL } from './HomeScreen';





const CamNang = ({ navigation, route }) => {

  const [cart, setCart] = useState([]);
  const refCart = useRef(null);



  const getData = async () => {
    const response = await fetch(`${URL}/carts`);
    const cartData = await response.json();
    const resopnseProduct = await fetch(`${URL}/products`);
    const listProduct = await resopnseProduct.json();
    const listCard = [];
    for (let i = 0; i < cartData.length; i++) {
      const product = listProduct.find(item => item.id == cartData[i].idSP)
      if (product) {
        const item = { ...product, ...cartData[i] };
        for (const key in item.data) {
        if (item.data[key] === '' || (item.giaSP.find(element => element.size === key) && Number(item.data[key]))) {
          listCard.push(item);
        }
      }
        
      }
      
    }
    setCart(listCard);
  }

  useEffect(() => {
    refCart.current = cart
  }, [cart])

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return async () => {
        for (let i = 0; i < refCart.current.length; i++) {
          const element = refCart.current[i];
          try {
            const resopnse = await fetch(`${URL}/carts/${element.id}`, {
              method: 'PATCH', body: JSON.stringify({
                data: element.data
              })
            })
          } catch (error) {
            console.log('error ===', error)
          }
        }
      }
    }, [])
  );



  const showItem = (item) => {
    let show = false;
    for (const key in item.data) {
      if (item.data[key] === '' || (item.giaSP.find(element => element.size === key) && Number(item.data[key]))) {
        show = true;
      }
    }
    return show;
      
  }
  

  const CartCard = ({ item, index }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeSelection = (size) => {
      setSelectedSize(size);
    };
    let show = showItem(item);
   

    return !show ? null : (
      <View>


        <View style={styles.cartCard}>
            <TouchableOpacity onPress={() => navigation.navigate('KienThuc', {image: item.linkAnh, title: item.tenSP, classify: item.phanLoai, loaiSP: item.loaiSP})}>
          <View style={{ flexDirection: 'row'}}>
           
            <Image source={{ uri: item.linkAnh }} style={{ height: 90, width: 90, borderRadius: 10, }} />
            <View>

              <View style = {{flexDirection: 'row'}}>

              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginLeft: 20 }}>{item.tenSP}|</Text>
              <Text style={{ fontSize: 14, color: 'gray', marginLeft: 5, top: 3 }}>{item.phanLoai}</Text>
              </View>
              <Text style={{ fontSize: 13, color: 'gray', marginLeft: 20 }}>
              Hàng Chất Lượng Cao
              </Text>
            </View>
          </View>
          </TouchableOpacity>

          
        </View>
      </View>

    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>



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
        <Text style={styles.cart}>Thông tin sản phẩm</Text>

      </View>

      <FlatList
        data={cart}

        renderItem={({ item, index }) => <CartCard key={item.id} item={item} index={index} />}

      /> 


    </SafeAreaView>
  )
}



export default CamNang

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',  
    margin: 20
  },
  cart: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: "black",
    marginLeft: 80
  },
  image1: {
    width: 40,
    height: 40,
    marginRight: 120,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 5
  },
  image2: {
    width: 40,
    height: 40,
    marginLeft: 130,
    borderRadius: 10,
    marginTop: 10,
  },
  name: {
    color: "black",
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,

  },
  name1: {
    color: "black",
    marginHorizontal: 10,
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginBottom: 5


  },

  click1: {
    flexDirection: 'row',
    marginTop: 25

  },

  cartCard: {
    height: 'auto',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    padding: 15,
    backgroundColor: 'whitesmoke',
  },

})
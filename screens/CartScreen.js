import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity,Alert, FlatList, ToastAndroid ,} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import { URL } from './HomeScreen';





const CartScreen = ({ navigation, route }) => {

  const [cart, setCart] = useState([]);
  const refCart = useRef(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)



  const getData = async () => {
    const response = await fetch(`${URL}/carts`);
    const cartData = await response.json();
    const resopnseProduct = await fetch(`${URL}/products`);
    const listProduct = await resopnseProduct.json();
    const listCard = [];
    for (let i = 0; i < cartData.length; i++) {
      const product = listProduct.find(item => item.id == cartData[i].idSP)
      if (product) {
        const item = { ...product, ...cartData[i], isChecked: false };
        for (const key in item.data) {
        if (item.data[key] === '' || (item.giaSP.find(element => element.size === key) && Number(item.data[key]))) {
          listCard.push(item);
        }
      }
        
      }
      
    }

    // Kiểm tra và cập nhật giỏ hàng
  const updatedCart = [...cart];
  for (const item of listCard) {
    const existingIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);
    if (existingIndex !== -1) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      updatedCart[existingIndex] = item;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      updatedCart.push(item);
    }
  }
    setCart(updatedCart);
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

  const handleCheckBoxToggle = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].isChecked = !updatedCart[index].isChecked;
    setCart(updatedCart);
  };

  const handleDeleteAll = () => {
    Alert.alert(
      'Xác nhận',
      'Xóa tất cả các đơn hàng?',
      
      
      [
        {
          text: 'Hủy bỏ',
          onPress: () =>  ToastAndroid.show('Hủy xóa', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async() => 
           
          {
            const deletedItems = cart.filter(item => item.isChecked);
            try {
              // Lặp qua từng mục được chọn và gửi yêu cầu DELETE đến cơ sở dữ liệu
              for (const item of deletedItems) {
                await fetch(`${URL}/carts/${item.id}`, {
                  method: 'DELETE'
                });
              }
            const updatedCart = cart.filter(item => !item.isChecked);
            setCart(updatedCart);
            ToastAndroid.show('Đã xóa', ToastAndroid.SHORT);
            }catch (error) {
              console.log('Lỗi khi xóa dữ liệu:', error);
            }
          },
              
          
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Xác nhận',
      'Xóa đơn hàng?',
      
      
      [
        {
          text: 'Hủy bỏ',
          onPress: () =>  ToastAndroid.show('Hủy xóa', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            const item = cart[index];
            const idToDelete = cart[index].id; // Lấy ID của mục cần xóa
            if (Object.keys(item.data).length > 1) {
              // Nếu sản phẩm có nhiều hơn một kích thước, chỉ cần xóa kích thước hiện tại
              const selectedSize = Object.keys(item.data)[index];
              delete item.data[selectedSize];
              const updatedCart = [...cart];
              updatedCart[index] = item;
              setCart(updatedCart);
            } else {
              // Nếu sản phẩm chỉ có một kích thước, xóa hoàn toàn sản phẩm
            try {
            await fetch(`${URL}/carts/${idToDelete}`, {
              method: 'DELETE'
            });
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setCart(updatedCart);
            ToastAndroid.show('Đã xóa', ToastAndroid.SHORT);
          } catch (error) {
            console.log('Lỗi khi xóa dữ liệu:', error);
          }
        
          }  
        } 
        },
      ],
      { cancelable: false }
    );
  };

  const showItem = (item) => {
    let show = false;
    for (const key in item.data) {
      if (item.data[key] === '' || (item.giaSP.find(element => element.size === key) && Number(item.data[key]))) {
        show = true;
      }
    }
    return show;
      
  }
  



  const totalPrice = useMemo(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      for (const value of element.giaSP) {
        total += (Number(element.data[value.size] || 0) * Number(value.price));
      }
    }
    return total.toFixed(2);
  }, [cart])

  const CartCard = ({ item, index }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const handleSizeSelection = (size) => {
      setSelectedSize(size);
      setIsChecked(!isChecked);
        };
    let show = showItem(item);
   

    return !show ? null : (
      <View>


        <View style={styles.cartCard}>
          <View style={{ flexDirection: 'row'}}>
            <CheckBox

              disabled={false}
              value={item.isChecked}
              style = {{marginTop: 20, marginRight: 10}}
              onValueChange={() => handleCheckBoxToggle(index)}// Chỉ cho phép chọn một ô checkbox mỗi lần
            />
            <Image source={{ uri: item.linkAnh }} style={{ height: 90, width: 90, borderRadius: 10, }} />
            <View>

              <View style = {{flexDirection: 'row'}}>

              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginLeft: 20 }}>{item.tenSP}|</Text>
              <Text style={{ fontSize: 14, color: 'gray', marginLeft: 5, top: 3 }}>{item.phanLoai}</Text>
              </View>
              <Text style={{ fontSize: 13, color: 'gray', marginLeft: 20 }}>
                {item.loaiSP}
              </Text>
            </View>
          </View>

          <View >

            {item.giaSP && item.giaSP.map(option => {
              return (item.data[option.size] === '' || (item.data[option.size] && Number(item.data[option.size]))) ? <Text
                key={option.size}
                onPress={() => handleSizeSelection(option)}

              >
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{
                    color: 'black',
                    textAlign: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    borderColor: 'green',
                    borderWidth: 1,
                    marginTop: 15,
                    fontSize: 15,
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                  }}
                  >
                    {option.size}</Text>
                  <Text style={{ color: 'green', marginTop: 25, marginHorizontal: 20, fontWeight: 'bold', fontSize: 20 }}> $ {(Number(item.data[option.size]) * option.price).toFixed(2)}</Text>
               

                <View style={styles.click1}>
                  <TouchableOpacity onPress={() => {
                    cart[index].data[option.size] = String(Number(cart[index].data[option.size]) - 1);
                    const show = showItem(cart[index]);
                    if(!show){
                      cart.splice(index,1)
                    }
                    setCart([...cart])
                  }}>
                    <Text style={styles.name}>-</Text>
                  </TouchableOpacity>

                  <TextInput style={styles.name1} keyboardType='numeric' value={item.data[option.size] + ""} onChangeText={(value) => {
                    cart[index].data[option.size] = value;
                    setCart([...cart])
                  }} />


                  <TouchableOpacity onPress={() => {
                    cart[index].data[option.size] = String(Number(cart[index].data[option.size]) + 1);
                    setCart([...cart])
                  }}>
                    <Text style={styles.name}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 18, marginLeft: 5 }}>Xóa</Text>
                  </TouchableOpacity>
                </View>
                </View>

              </Text> : null

            })}

          </View>
        </View>
      </View>

    );
  };

  console.log("ahvhjklb", cart);
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
        <Text style={styles.cart}>Giỏ hàng</Text>

        <TouchableOpacity onPress={handleDeleteAll}>
          <Image style={{ width: 25, height: 25 }}
            resizeMode="cover"
            source={require('../img/delete.png')}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        ListEmptyComponent={
          <Text style ={{color: 'black', alignSelf: 'center', fontSize: 18}}>Giỏ hàng của bạn hiện đang trống</Text>
        }
        renderItem={({ item, index }) => <CartCard key={item.id} item={item} index={index} />}

      />

{!cart?.length ? null : <><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: 'black', marginLeft: 20, marginTop: 10, fontSize: 17 }}>Tạm tính</Text>
        <Text style={{ color: 'black', marginRight: 20, fontSize: 20, fontWeight: 'bold' }}>$ {totalPrice}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("PaymentScreen", { totalPrice, data: cart })}
        style={{ backgroundColor: "green", width: '95%', margin: 10, borderRadius: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, padding: 10, fontWeight: 'bold' }}>Tiến hành thanh toán </Text>
      </TouchableOpacity></>}
      


    </SafeAreaView>
  )
}



export default CartScreen

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
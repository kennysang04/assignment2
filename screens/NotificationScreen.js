import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { URL } from './HomeScreen';
import { useFocusEffect } from '@react-navigation/native';


const NotificationScreen = ({ navigation, route }) => {

  const [listOrder, setListOrder] = useState([]);

  const getData = async() => {
    const responseOrder = await fetch(`${URL}/orders`);
    const dataOrder = await responseOrder.json();
    const resopnseProduct =  await fetch(`${URL}/products`);
    const listProduct = await resopnseProduct.json();
    const listOrder = [];
    for (let i = 0; i < dataOrder.length; i++) {
      const product = listProduct.find(item => item.id == dataOrder[i].idSP)
     if(product){
      listOrder.push({...product, ...dataOrder[i]})
     }
    }

    setListOrder(listOrder.sort((a,b) => a.createAt - b.createAt));
  }

  const getTotalAmount = (timestamp) => {
    let total = 0;
    for (let i = 0; i < listOrder.length; i++) {
      const {createAt, totalPrice} = listOrder[i];
      if(new Date(Number(createAt)).toDateString() === new Date(Number(timestamp)).toDateString()){
        total += totalPrice;
      }
    }
    return total.toFixed(2);
  }


  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const CartCard = ({ item, index }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeSelection = (size) => {
      setSelectedSize(size);
    };

    const createAt = new Date(Number(item.createAt));
    const condtion = new Date(Number(listOrder[index-1]?.createAt || '0')).toDateString() != new Date(Number(listOrder[index].createAt)).toDateString();

    return (
      <ScrollView>
      <View>
        <View>
        { condtion ? 
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
            
            <View>
            <Text style={{ color: 'black', fontSize: 16, top: 5, }}>{createAt.getDate()+"/"+(createAt.getMonth()+1)+"/"+createAt.getFullYear()}</Text>
            </View> 
            
            <View>
            </View> 
            
          </View> : null }

          
         
          <View style={styles.cartCard}>
            <View style={{ flexDirection: 'row'}}>
              <Image source={{ uri: item.linkAnh }} style={{ height: 90, width: 90, borderRadius: 10, }} />
              <View>

                <Text style = {{color : 'green',marginLeft: 20}}>Đặt hàng thành công</Text>
                <View style = {{flexDirection: 'row'}}>
    
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black',marginLeft: 20}}>{item.tenSP}|</Text>
                <Text style={{fontSize: 14, color: 'gray', marginLeft: 3, top: 2}}>{item.phanLoai}</Text>

                </View>
                <Text style={{ fontSize: 14, color: 'black',marginLeft: 20}}>
                  2 sản phẩm
                </Text>
              </View>

              
            </View>

          </View>
        </View>
      </View>
      </ScrollView>

    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>

      <View>

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../img/back1.png')}
                style={styles.image1}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.cart}>Thông báo</Text>
          </View>

        </View>

      </View>

      <FlatList
        data={listOrder}
        renderItem={({ item, index }) => <CartCard key={item.id} index={index} item={item} />}
      />

    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cart: {
    fontWeight: 'bold',
    fontSize: 22,
    color: "black",
  },
  image1: {
    width: 30,
    height: 30,
    marginRight: 100,
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
    color: "white",
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "orange",
    borderRadius: 5,

  },
  name1: {
    color: "white",
    marginHorizontal: 10,
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'black',
    borderColor: "orange",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,

  },

  click1: {
    flexDirection: 'row',

  },

  cartCard: {
    height: 'auto',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: 'whitesmoke',
  },
})
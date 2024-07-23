import { StyleSheet, Text, View, Image} from 'react-native'
import React, {useEffect} from 'react'

const Splash = ({navigation}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
     navigation.replace('Login')
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    
   <View style = {styles.background}>
    <Image
     source={{uri: 'https://i.pinimg.com/564x/12/e9/aa/12e9aa29142c347acdf86dc3aa13d361.jpg'}}
     style={{width: 400, height: 400, marginTop: 200,alignSelf:"center", justifyContent:'center'}}
    />
 
   </View>
  
    
  
 
);
}

export default Splash

const styles = StyleSheet.create({
  background: { ...StyleSheet.absoluteFillObject, backgroundColor: "white" },

})
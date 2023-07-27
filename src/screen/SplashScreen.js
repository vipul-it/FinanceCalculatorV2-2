import { Image, StatusBar, View} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
  },1000);
  },[]);
  return (
    <View className="flex-1">
      <StatusBar backgroundColor="#879DFF" />
     <Image source={require('../assets/images/SplashScreen.png')}
     style={{width:"100%",height:"100%"}}
     />
    </View>
  )
}

export default SplashScreen
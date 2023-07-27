import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const CalculateButton = ({name, srcPath, onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 14,
            backgroundColor: '#1B39FE',
            alignItems: 'center',
            borderRadius: 10,
            paddingVertical: 6,
            justifyContent: 'center'
          }}>
          <Image
            source={srcPath}
            style={{
              tintColor: '#fff',
              width: 10,
              height: 14,
              marginRight: 5,
              
            }}
          />
          <Text style={{color: '#fff', fontSize: 15}}>{name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CalculateButton;

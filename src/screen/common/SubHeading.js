import {View, Text} from 'react-native';
import React from 'react';

const SubHeading = ({name}) => {
  return (
    <View>
      <Text className="my-3 text-primaryHeading text-xl font-semibold">{name}</Text>
    </View>
  );
};

export default SubHeading;

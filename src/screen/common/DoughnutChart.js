import React from 'react';
import {View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const DoughnutChart = ({chartData}) => {
  

  return (
    <View>
      <PieChart
        data={chartData}
        width={400}
        height={150}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        // paddingLeft="-10"
        
      />
    </View>
  );
};

export default DoughnutChart;

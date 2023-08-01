import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import SQLite from 'react-native-sqlite-storage';
import TopTwoIcon from '../common/TopTwoIcon';
import {allImages} from '../../utils/images';

const db = SQLite.openDatabase('mydb.db');

const RdCalculatorHistory = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  // alert(JSON.stringify(data))

  const deleteRecord = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM RdCalculatorHistory WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Success', 'Record deleted successfully!');
            fetchData();
          } else {
            Alert.alert('Error', 'Failed to delete record!');
          }
        },
      );
    });
  };

  const handleDeleteDatabase = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete the all History?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteAllRecords(),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteAllRecords = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM RdCalculatorHistory', [], (_, result) => {
        if (result.rowsAffected > 0) {
          // Alert.alert('Success', 'All records deleted successfully!');
          fetchData();
        } else {
          Alert.alert('Error', 'Failed to delete records!');
        }
      });
    });
  };

  const fetchData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM RdCalculatorHistory', [], (_, {rows}) => {
        const len = rows.length;
        const tempData = [];

        for (let i = 0; i < len; i++) {
          tempData.push(rows.item(i));
        }

        setData(tempData);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(JSON.stringify(data));

  const showAlert = () => {
    Alert.alert('Alert', 'History Clear.');
  };
  return (
    <View className="flex-1 bg-whiteC">
      <TopTwoIcon
        name="RD History"
        onPressRight={handleDeleteDatabase}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <Text className="py-1"></Text>
      <View className="">
        <ScrollView className="mb-28">
          <View style={{flex: 1}}>
            {data.map(item => (
              <View key={item.id}>
                <View className="flex-row border-[1px] border-Cgray50 justify-between mx-5 items-center rounded-lg p-4 my-2">
                  <View className="flex-row  items-center">
                    <TouchableOpacity
                      onPress={() => deleteRecord(item.id)}
                      className=" mr-[20px]">
                      <Image
                        className="w-[14px] h-[20px]"
                        style={{tintColor: '#1F3CFE'}}
                        source={allImages.Delete}
                      />
                    </TouchableOpacity>
                    {/* monthlyAmount, interest, timePeriod, maturityAmount, totalInterest, totalInvestment */}
                    <View>
                      <Text className="text-primaryHeading font-semibold ">
                        Amount: &#8377; {item.monthlyAmount}
                      </Text>
                      <Text className="text-primaryHeading font-semibold ">
                        Interest Rate: % {item.interest}
                      </Text>

                      <Text className="text-primaryHeading font-semibold ">
                        Time Period: Months {item.timePeriod}
                      </Text>

                      <Text className="text-primaryDark font-semibold">
                        Maturity Amount: &#8377; {item.maturityAmount}
                      </Text>
                      <Text className="text-primaryDark font-semibold">
                        Total Investment: &#8377; {item.totalInvestment}
                      </Text>
                    </View>
                  </View>
                  <View></View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RdCalculatorHistory;

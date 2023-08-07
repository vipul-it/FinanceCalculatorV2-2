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

const InterestCalculatorHistoryDate = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  // alert(JSON.stringify(data))

  const deleteRecord = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM InterestCalculatorHistoryDatewise WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Success', 'Record deleted successfully!');
            fetchDataDate();
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
      tx.executeSql(
        'DELETE FROM InterestCalculatorHistoryDatewise',
        [],
        (_, result) => {
          if (result.rowsAffected > 0) {
            // Alert.alert('Success', 'All records deleted successfully!');
            fetchDataDate();
          } else {
            Alert.alert('Error', 'Failed to delete records!');
          }
        },
      );
    });
  };

  const fetchDataDate = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM InterestCalculatorHistoryDatewise',
        [],
        (_, {rows}) => {
          const len = rows.length;
          const tempData = [];

          for (let i = 0; i < len; i++) {
            tempData.push(rows.item(i));
          }

          setData(tempData);
        },
      );
    });
  };

  useEffect(() => {
    fetchDataDate();
  }, []);
  // console.log(JSON.stringify(data));

  const showAlert = () => {
    Alert.alert('Alert', 'History Clear.');
  };
  return (
    <View className="flex-1 bg-whiteC">
      <TopTwoIcon
        name="Interest History"
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

                    {/* amount, interest, compoundInterval, principleAmount, years, months, totalInterest, totalAmount, damount, dinterest, dcompoundInterval, dprincipleAmount, dtotalInterest, dtotalAmount */}

                    <View>
                      <Text className="text-primaryHeading font-semibold ">
                        Amount &#8377; {item.damount}, Interest Rate{' '}
                        {item.dinterest}
                        %,
                      </Text>
                      <Text className="text-primaryHeading font-semibold ">
                        Compound Interval {item.dcompoundInterval},
                      </Text>

                      <Text className="text-primaryHeading font-semibold ">
                        Years{item.dyears}, Months {item.dmonths}, Day:{' '}
                        {item.ddays},
                      </Text>
                      <Text className="text-primaryDark font-semibold">
                        Principle Amount &#8377; {item.dprincipleAmount}
                      </Text>
                      <Text className="text-primaryDark font-semibold">
                        Total Inerest &#8377; {item.dtotalInterest}
                      </Text>
                      <Text className="text-primaryDark font-semibold">
                        Total Amount &#8377; {item.dtotalAmount}
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

export default InterestCalculatorHistoryDate;

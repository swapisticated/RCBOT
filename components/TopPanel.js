import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const TopPanel = ({ isPowerOn, togglePower }) => {
  return (
    <View className='absolute w-full h-1/5 bg-gray-700 border-gray-400 border-b  rounded-t-3xl flex-1 flex-row justify-center items-center'>
      <TouchableOpacity
        className={`ml-4 p-2 h-12 w-12 rounded-full ${isPowerOn ? 'bg-teal-400 shadow-lg shadow-green-400/100' : 'bg-red-300 shadow-2xl shadow-red-400/100'}`}
        onPress={togglePower}
      >
      </TouchableOpacity>
    </View>
  );
};

export default TopPanel;


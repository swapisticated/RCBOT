import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput, StatusBar } from 'react-native';
import { startSendingCommand, stopSendingCommand, toggleSpeed, sendCommand } from '../services/WiFiService';
import Slider from '@react-native-community/slider'; // Import Slider component
import Icon from 'react-native-vector-icons/FontAwesome6';


const ControlScreen = () => {
    const [speed, setSpeed] = useState(50); // Default speed set to 50%
    const [isObjectAvoidanceActive, setObjectAvoidanceActive] = useState(false);
    const [isLineFollowerActive, setLineFollowerActive] = useState(false);
    const [isDanceModeActive, setDanceModeActive] = useState(false);
    const [isPowerOn, setPowerOn] = useState(true); // State for power toggle
    const [colorIndex, setColorIndex] = useState(0); // State for current color index
    const [leftServo, setLeftServo] = useState(90); // Default value for left servo
    const [rightServo, setRightServo] = useState(90); // Default value for right servo

    // Array of predefined color hex codes
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];

    const togglePower = () => {
        setPowerOn(!isPowerOn);
        if (isPowerOn) {
            // If turning off, stop all commands
            stopSendingCommand();
            sendCommand('stop_object_avoidance');
            sendCommand('stop_line_follower');
            sendCommand('stop_dance_mode');
            setObjectAvoidanceActive(false);
            setLineFollowerActive(false);
            setDanceModeActive(false);
        }
    };

    const toggleObjectAvoidance = () => {
        if (isObjectAvoidanceActive) {
            sendCommand('stop_object_avoidance');
            setObjectAvoidanceActive(false);
        } else {
            sendCommand('object_avoidance');
            setObjectAvoidanceActive(true);
        }
    };

    const toggleLineFollower = () => {
        if (isLineFollowerActive) {
            sendCommand('stop_line_follower');
            setLineFollowerActive(false);
        } else {
            sendCommand('line_follower');
            setLineFollowerActive(true);
        }
    };

    const toggleDanceMode = () => {
        if (isDanceModeActive) {
            sendCommand('stop_dance_mode');
            setDanceModeActive(false);
        } else {
            sendCommand('dance_mode');
            setDanceModeActive(true);
        }
    };

    const sendColorToESP32 = () => {
        const currentColor = colors[colorIndex];
        // Remove the '#' from the beginning if present
        const cleanedHexColor = currentColor.replace('#', '');
        sendCommand(`set_color=${cleanedHexColor}`);

        // Update color index to the next color
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    };

    const handleLeftServoChange = (value) => {
        setLeftServo(value);
        sendCommand(`left_servo=${value}`); // Send command for left servo
    };

    const handleRightServoChange = (value) => {
        setRightServo(value);
        sendCommand(`right_servo=${value}`); // Send command for right servo
    };


    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar backgroundColor="#b3e6ff" barStyle="light-content" />
            <View>
                <StatusBar hidden={true} />
            </View>
            <View className="flex-1 flex-row justify-center items-center">
                <View className='flex-row justify-around align-middle items-center aspect-auto h-full w-full p-4 bg-gray-600 rounded-3xl'>
                    {/* Left control column with buttons */}
                    <View className="w-1/4 h-1/4 aspect-square bg-zinc-500 border-zinc-600 border-2 p-4 rounded-full items-center justify-center" style={{ opacity: isPowerOn ? 1 : 0.5 }}>
                        {/* Forward Button */}
                        <TouchableOpacity
                            className="absolute  justify-center items-center aspect-square rounded-full w-1/3 h-2/3 inset-x-50 top-0"
                            onPressIn={() => isPowerOn && startSendingCommand('forward')}
                            onPressOut={stopSendingCommand}
                            disabled={!isPowerOn}
                        >
                            <Icon name="chevron-up" size={30} color={isPowerOn ? '#495C6E' : '#F16B6C'}
                                className="mb-16"
                            />

                        </TouchableOpacity>

                        {/* Backward Button */}
                        <TouchableOpacity
                            className="absolute justify-center items-center aspect-square rounded-full w-1/3 h-2/3 inset-x-50 bottom-0"
                            onPressIn={() => isPowerOn && startSendingCommand('backward')}
                            onPressOut={stopSendingCommand}
                            disabled={!isPowerOn}
                        >
                            <Icon name="chevron-down" size={30} color={isPowerOn ? '#495C6E' : '#F16B6C'}
                                className="mt-16"
                            />

                        </TouchableOpacity>

                        {/* Left Button */}
                        <TouchableOpacity
                            className="absolute justify-center items-center aspect-square  rounded-full w-2/3 h-1/3 inset-y-50 left-0"
                            onPressIn={() => isPowerOn && startSendingCommand('left')}
                            onPressOut={stopSendingCommand}
                            disabled={!isPowerOn}
                        >
                            <Icon name="angle-left" size={30} color={isPowerOn ? '#495C6E' : '#F16B6C'}
                                className=" mr-16"
                            />
                        </TouchableOpacity>

                        {/* Right Button */}
                        <TouchableOpacity
                            className="absolute justify-center items-center aspect-square rounded-full w-2/3 h-1/3 inset-y-50 right-0"
                            onPressIn={() => isPowerOn && startSendingCommand('right')}
                            onPressOut={stopSendingCommand}
                            disabled={!isPowerOn}
                        >
                            <Icon name="angle-right" size={30} color={isPowerOn ? '#495C6E' : '#F16B6C'}
                                className="ml-16"
                            />
                        </TouchableOpacity>

                        {/* Speed Toggle Button */}
                        <TouchableOpacity
                            className="justify-center w-2/5 h-2/5 aspect-square  items-center p-3 rounded-full border-4 bg-gray-500 border-zinc-400"
                            onPress={() => isPowerOn && toggleSpeed(speed, setSpeed)}
                            disabled={!isPowerOn}
                        >
                            <Image
                                source={require('../public/speedometer.png')}
                                className='h-10 w-10'
                            />
                            <Text className="text-white text-base">{speed}%</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Right panel with mode buttons */}
                    <View className="w-1/4 h-1/4 aspect-square  p-4 rounded-full items-center justify-center" style={{ opacity: isPowerOn ? 1 : 0.5 }}>
                        <TouchableOpacity
                            className={`absolute justify-center items-center aspect-square rounded-full w-1/3 h-1/3 inset-x-50 top-0 ${isObjectAvoidanceActive ? 'bg-zinc-500' : 'bg-zinc-500'}`}

                            onPress={toggleObjectAvoidance}
                            disabled={!isPowerOn}
                        >
                            <Image
                                source={isObjectAvoidanceActive
                                    ? require('../public/obstacle.png') // Icon when object avoidance is active
                                    : require('../public/obstacle_white.png') // Icon when object avoidance is inactive
                                }
                                className='h-10 w-10'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`absolute justify-center items-center aspect-square rounded-full w-1/3 h-1/3 inset-y-50 left-0 ${isLineFollowerActive ? 'bg-zinc-500' : 'bg-zinc-500'}`}
                            onPress={toggleLineFollower}
                            disabled={!isPowerOn}
                        >
                            <Image
                                source={isLineFollowerActive
                                    ? require('../public/robot.png') // Icon when object avoidance is active
                                    : require('../public/robot1.png') // Icon when object avoidance is inactive
                                }
                                className='h-10 w-10'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`absolute justify-center items-center aspect-square rounded-full w-1/3 h-1/3 inset-x-50 right-0 ${isLineFollowerActive ? 'bg-zinc-500' : 'bg-zinc-500'}`} onPress={toggleDanceMode}
                            disabled={!isPowerOn}
                        >
                            <Image
                                source={isDanceModeActive
                                    ? require('../public/techno.png') // Icon when object avoidance is active
                                    : require('../public/techno(1).png') // Icon when object avoidance is inactive
                                }
                                className='h-10 w-10'
                            />
                        </TouchableOpacity>

                        {/* Color Picker Button */}
                        <TouchableOpacity
                            className={`absolute justify-center items-center aspect-square rounded-full w-1/3 h-1/3 inset-x-50 bottom-0 bg-zinc-500`}
                            onPress={sendColorToESP32}
                            disabled={!isPowerOn}
                        >
                            <Image
                                source={require('../public/wheel(1).png')}
                                className='h-10 w-10'
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View className='absolute w-full h-14 bg-gray-700 top-0 rounded-t-3xl justify-center items-center'>
                <Image className='left-4 absolute aspect-square h-8 w-8 ' source={require('../public/cropped-Logo_circle-removebg-preview-50x50.png')} />
                <TouchableOpacity
                    className={`flex justify-between align-middle items-center  top-1/2 z-10 rounded-full ${isPowerOn ? 'shadow-lg shadow-green-400/100' : ' shadow-2xl shadow-red-400/100'}`}
                    onPress={togglePower}
                >
                    <Icon name="power-off" size={25} color={isPowerOn ? '#49B59F' : '#F16B6C'} />

                </TouchableOpacity>
                <View className='bg-transparent border-t-[20px] absolute top-[100%] left-50 w-40 border-l-[40px] h-[100px] border-r-[40px] border-t-gray-700 border-r-transparent border-l-transparent' />
            </View>
            <View className='bg-gray-700 absolute w-full h-12 bottom-0 justify-center items-center rounded-b-3xl'>
                <View className='bg-transparent border-b-[20px] absolute top-[-100] left-50 w-40 border-l-[40px] h-[100px] border-r-[40px] border-b-gray-700 border-r-transparent border-l-transparent' />
            </View>
            <View className="absolute w-full h-full flex-row justify-around items-center">
                {/* Left Servo Slider */}
                <View className="h-1/2 w-10  ml-4 rounded-lg backdrop-blur-md top-50 left-0 bg-zinc-400 opacity-50 absolute items-center justify-center">
                    {/* <Text className="text-white text-center mb-2">Left Servo: {leftServo}°</Text> */}
                    <Slider
                        style={{ width: 200, height: 40, transform: [{ rotate: '270deg' }] }}
                        minimumValue={0}
                        maximumValue={180}
                        step={1}
                        value={leftServo}
                        onValueChange={handleLeftServoChange}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>

                {/* Right Servo Slider */}
                <View className="h-1/2 w-10 mr-4 rounded-lg backdrop-blur-md top-50 right-0 bg-zinc-400 opacity-50 absolute items-center justify-center">
                    {/* <Text className="text-white text-center mb-2">Right Servo: {rightServo}°</Text> */}
                    <Slider
                        style={{ width: 200, height: 40, transform: [{ rotate: '270deg' }] }}
                        minimumValue={0}
                        maximumValue={180}
                        step={1}
                        value={rightServo}
                        onValueChange={handleRightServoChange}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </View>

        </SafeAreaView>
    );
};

export default ControlScreen;

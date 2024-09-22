// WiFiService.js
import axios from 'axios';

let commandInterval = null; // Store interval reference globally

// Function to send command to ESP32 server
const sendCommand = (command) => {
  axios.get(`http://192.168.4.1/${command}`)
    .then(() => console.log(`Command '${command}' sent successfully.`))
    .catch(error => console.error(`Error sending '${command}' command: `, error));
};

// Start continuously sending commands when button is pressed
const startSendingCommand = (command) => {
  sendCommand(command); // Send the first command immediately
  commandInterval = setInterval(() => {
    sendCommand(command); // Continue sending the command at regular intervals
  }, 200); // Adjust interval as needed
};

// Stop sending commands when button is released
const stopSendingCommand = () => {
  if (commandInterval) {
    clearInterval(commandInterval);
    commandInterval = null;
    sendCommand('stop'); // Send stop command
  }
};

// Speed toggle function
const toggleSpeed = (currentSpeed, setSpeedCallback) => {
  const newSpeed = currentSpeed === 25 ? 50 : currentSpeed === 50 ? 75 : currentSpeed === 75 ? 100 : 25;
  setSpeedCallback(newSpeed);
  sendCommand(`set_speed?value=${newSpeed}`);
};

// Exporting the service functions
export { sendCommand, startSendingCommand, stopSendingCommand, toggleSpeed };

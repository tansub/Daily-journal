import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Replace with your preferred icon library
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation(); // Access navigation object

  return (
    <View style={styles.container}>
      {/* Calendar Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('MainScreen')}
      >
        <FontAwesome5 name="calendar-alt" size={24} color="#003366" />
      </TouchableOpacity>

      {/* Create Event Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <FontAwesome5 name="edit" size={24} color="#003366" />
      </TouchableOpacity>

      {/* Event List Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('EventList')}
      >
        <FontAwesome5 name="list" size={24} color="#003366" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f7f1', // Light beige
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#003366', // Navy blue
  },
  iconContainer: {
    backgroundColor: '#a2c9e2', // Light blue
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavigation;

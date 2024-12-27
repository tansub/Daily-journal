import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { firestore } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore'; 
import BottomNavigation from '../components/BottomNavigation';

const EventList = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'events'));
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Journal</Text>
      <Text style={styles.subtitle}>Event List</Text>

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={styles.list}
      />
      <BottomNavigation/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f1',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 40,
    height: '200'

  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#a2c9e2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  eventDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#003366',
    paddingTop: 10,
    paddingBottom: 20,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003366',
  },
});

export default EventList;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { firestore } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import BottomNavigation from '../components/BottomNavigation';

const MainScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'events'), (snapshot) => {
      const fetchedEvents = {};
      const fetchedMarkedDates = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const eventDate = data.date.split('T')[0];

        if (!fetchedEvents[eventDate]) {
          fetchedEvents[eventDate] = [];
        }
        fetchedEvents[eventDate].push({
          id: doc.id,
          title: data.name,
          description: data.description,
          time: new Date(data.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: data.date,
          image: data.image,
          type: data.eventType
        });

        fetchedMarkedDates[eventDate] = { marked: true, dotColor: 'blue' };
      });

      setEvents(fetchedEvents);
      setMarkedDates(fetchedMarkedDates);
    });

    return () => unsubscribe();
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Journal</Text>
        <Text style={styles.subtitle}>Main</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateEvent')}>
        <Text style={styles.addButtonText}>Add New Event</Text>
      </TouchableOpacity>

      <Text style={styles.date}>{selectedDate || 'Select a date'}</Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          monthFormat={'yyyy MM'}
          style={styles.calendar}
        />
        {selectedDate && events[selectedDate] && (
          <View style={styles.eventList}>
            {events[selectedDate].map((event, index) => (
              <TouchableOpacity
                key={index}
                style={styles.eventItem}
                onPress={() => navigation.navigate('EventDetails', { event })}
              >
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text>{event.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <BottomNavigation style={{marginBottom:40}}/>
    </ScrollView>
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  addButton: {
    backgroundColor: '#a2c9e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  viewPast: {
    borderBottomWidth: 1,
    borderBottomColor: '#003366',
    marginVertical: 20,
    paddingBottom: 10,
  },
  viewPastText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
  },
  calendarContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  calendar: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  eventList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  eventItem: {
    marginBottom: 10,
  },
  eventTitle: {
    fontWeight: 'bold',
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

export default MainScreen;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import BottomNavigation from "../components/BottomNavigation";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const EventDetails = ({ route, navigation }) => {
  const { event } = route.params;

  const handleDelete = async () => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            navigation.navigate("MainScreen"); 

            try {
              const eventRef = doc(firestore, "events", event.id);
              await deleteDoc(eventRef);
            } catch (error) {
              console.error("Error deleting event:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Journal</Text>

      <View style={styles.dateContainer}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{new Date(event.date).getDate()}</Text>
          <Text style={styles.monthText}>
            {new Date(event.date).toLocaleString("default", { month: "long" })}
          </Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.nameText}>{event.title}</Text>
          <Text style={styles.typeText}>{event.type}</Text>
        </View>
      </View>

      {event.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.image }}
            style={styles.imagePlaceholder}
          />
        </View>
      )}

      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>{event.description}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditEventScreen", { event })}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>

      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002366", 
    textAlign: "center",
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateBox: {
    width: "45%",
    backgroundColor: "#D8EBF1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002366",
  },
  monthText: {
    fontSize: 16,
    color: "#6B6B6B",
  },
  detailsBox: {
    width: "45%",
    backgroundColor: "#D8EBF1",
    borderRadius: 10,
    padding: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002366",
    marginBottom: 5,
  },
  typeText: {
    fontSize: 14,
    color: "#6B6B6B",
  },
  imageContainer: {
    marginVertical: 20,
    backgroundColor: "#D8EBF1",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    marginTop: 70,
  },
  imagePlaceholder: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
  },
  descriptionBox: {
    backgroundColor: "#D8EBF1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#002366",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#D8EBF1",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: "#002366",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#002366",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#D8EBF1",
    paddingTop: 10,
    marginTop: 20,
  },
});

export default EventDetails;

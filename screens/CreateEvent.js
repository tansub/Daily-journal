import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firestore } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import BottomNavigation from "../components/BottomNavigation";

const CreateEvent = ({ navigation }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventType, setEventType] = useState("");

  const verifyPermissions = async () => {
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
    const libraryResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraResult.status !== "granted" &&
      libraryResult.status !== "granted"
    ) {
      Alert.alert(
        "Need Permissions",
        "Camera and library permissions are required."
      );
      return false;
    }
    return true;
  };

  const retrieveImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return;
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }
  };

  const onChangeDateHandler = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      console.log(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleSaveEvent = async () => {
    navigation.goBack();
    if (!name || !date || !description || !eventType) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      const docRef = await addDoc(collection(firestore, "events"), {
        name,
        date: date.toISOString(),
        description,
        eventType,
        image,
      });
    } catch (error) {
      console.error("Error saving event:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Journal</Text>
      <Text style={styles.subtitle}>Create Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDateHandler}
        />
      )}

      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.eventTypeContainer}>
        {["Work", "Personal", "Other"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.eventTypeButton,
              eventType === type && styles.selectedButton,
            ]}
            onPress={() => setEventType(type)}
          >
            <Text style={styles.eventTypeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.attachImageButton}
        onPress={retrieveImageHandler}
      >
        <Text style={styles.buttonText}>Attach Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f7f1",
    padding: 20,
    justifyContent: "flex-start",
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#003366",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  textArea: {
    height: 100,
    borderColor: "#003366",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
    textAlignVertical: "top",
  },
  eventTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    marginTop: 70,
  },
  eventTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#003366",
    borderWidth: 1,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: "#003366",
    color: "#ffffff",
  },
  eventTypeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  attachImageButton: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#a2c9e2",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default CreateEvent;

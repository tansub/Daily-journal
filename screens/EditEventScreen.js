import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const EditEventScreen = ({ route, navigation }) => {
  const { event } = route.params;

  const [name, setName] = useState(event.title || "");
  const [date, setDate] = useState(
    event.date ? new Date(event.date) : new Date()
  );
  const [description, setDescription] = useState(event.description || "");
  const [type, setType] = useState(event.type || "Work");
  const [image, setImage] = useState(event.image || null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAttachImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !date || !description) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    try {
      const formattedDate = date.toISOString();
      const updatedEvent = {
        name,
        date: formattedDate,
        description,
        type,
        image,
      };
      navigation.navigate("MainScreen"); 
      const eventRef = doc(firestore, "events", event.id); // Reference to the event document
      await updateDoc(eventRef, updatedEvent);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false); 
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Journal</Text>
      <Text style={styles.subtitle}>Edit Event</Text>

      <View style={styles.inputContainer}>
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
          <Text>{date.toISOString().split("T")[0]}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.detailsTitle}>Details</Text>
      <View style={styles.typeContainer}>
        {["Work", "Personal", "Other"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.typeButton,
              type === item && styles.selectedTypeButton,
            ]}
            onPress={() => setType(item)}
          >
            <Text
              style={[
                styles.typeButtonText,
                type === item && styles.selectedTypeButtonText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      <View style={styles.imageButtonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={handleAttachImage}>
          <Text style={styles.imageButtonText}>Attach Image</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002366",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#002366",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  textArea: {
    height: 100,
    borderColor: "#002366",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#002366",
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  typeButton: {
    backgroundColor: "#D8EBF1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectedTypeButton: {
    backgroundColor: "#002366",
  },
  typeButtonText: {
    color: "#002366",
    fontWeight: "bold",
  },
  selectedTypeButtonText: {
    color: "#FFF",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  imageButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: "#002366",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
  },
  imageButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default EditEventScreen;

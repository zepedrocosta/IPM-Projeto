import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import AddDocumentModal from "./AddDocumentModal";
import SetReminderModal from "./SetReminderModal";

// Uncomment these 2 imports when firebase and it's setup is done
//import { getDocs, collection } from 'firebase/firestore'; // Assuming you're using Firestore TODO
//import { db } from './firebaseConfig'; // Import your Firebase configuration TODO

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [isAddDocumentModalVisible, setAddDocumentModalVisible] = useState(false);
  const [isSetReminderModalVisible, setReminderModalVisible] = useState(false);

  var documents1 = [1, 2, 3];
  // Uncomment this function when we have firebase access
  // useEffect() hook: runs the effect only once when the component mounts (because the dependency array is empty, the dependecy array is []). In this case, it runs the code inside the function after the initial render.
  //{useEffect(() => {
  // Fetch documents from Firestore
  //    const fetchDocuments = async () => {
  //        const querySnapshot = await getDocs(collection(db, 'documents'));
  //        const docs = querySnapshot.docs.map(doc => doc.data());
  //        setDocuments(docs); // Store documents in state
  //    };
  //
  //    fetchDocuments();
  //}, []);}

  // Function to add a new document
  function handleAddDocument(document: { file: any; category: string; date: Date | null }){
    console.log("added document: ", document);
    setAddDocumentModalVisible(false)
    reminderRequest();
    //setDocuments([...documents, newDocument]);
  };

  function reminderRequest(){
    setReminderModalVisible(true);
    console.log("Would you like to add a reminder?")

  }

  function handleSetReminder(){
    console.log("set a reminder");

  };

  /** Just missing the document header above the page with the arrow to go a page back */
  return (
    <View style={styles.container}>
      {documents1.length === 0 && <Text>No documents added...</Text>}{" "}
      {/** condition && //stuff we want to render */}
      <View style={styles.documentsContainer}>
        {/** We will have several of these document views. Each one represents a document */}
        {documents1.map((document, index) => (
          <View key={index} style={styles.document}>
            <Text>Document x</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity>
                <MaterialIcons name="cloud-download" size={20} color="green" />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 15 }}>
                <MaterialIcons name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      
      <AddDocumentModal
        visible={isAddDocumentModalVisible}
        onClose={() => setAddDocumentModalVisible(false)}
        onConfirm={() => handleAddDocument}
      />
    
      <SetReminderModal
        visible={isSetReminderModalVisible}
        onClose={() => setReminderModalVisible(false)}
        onConfirm={() => handleSetReminder()}
      />
      {/** Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setAddDocumentModalVisible(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
  documentsContainer: {
    flexDirection: "column",
    height: "80%",
  },
  document: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {},
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "blue",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    //elevation: 5, // Adds shadow on Android
    //shadowColor: '#000', // Adds shadow on iOS
    //shadowOpacity: 0.3,
    //shadowOffset: { width: 0, height: 2 },
    //shadowRadius: 5,
    zIndex: 1,
  },
});

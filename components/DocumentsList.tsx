import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AddDocumentModal from "./AddDocumentModal";
import { Car } from "@/types/car";
import { httpDelete, httpGet } from "@/utils/http";
import * as FileSystem from "expo-file-system";

type Document = {
  filename: string;
  type: string;
  dueDate: Date;
  plate: String;
};

export default function DocumentsList({ car }: { car: Car }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isAddDocumentModalVisible, setAddDocumentModalVisible] =
    useState(false);
  const [isSetReminderModalVisible, setReminderModalVisible] = useState(false);

  useEffect(() => {
    if (car.plate !== "") {
      httpGet("/cars/" + car.plate + "/documents").then(
        (response: any) => {
          console.log("Documents fetched: ", response.data);
          setDocuments(response.data);
        },
        (error) => {
          console.log("Error fetching documents: ", error);
        }
      );
    }
  }, [car, isAddDocumentModalVisible]);

  // Function to add a new document
  function handleAddDocument() {
    setAddDocumentModalVisible(false);
    reminderRequest();
    //setDocuments([...documents, newDocument]);
  }

  function reminderRequest() {
    setReminderModalVisible(true);
    console.log("Would you like to add a reminder?");
  }

  function handleDownload(doc: Document) {
    ToastAndroid.show("Downloading document...", ToastAndroid.LONG);
    httpGet("/cars/" + car.plate + "/documents/" + doc.filename).then(
      (response: any) => {
        const base64 = response.data;
        const path = `${FileSystem.documentDirectory}${doc.filename}.pdf`;

        FileSystem.writeAsStringAsync(path, base64, {
          encoding: FileSystem.EncodingType.Base64,
        })
          .then(() => {
            console.log("PDF saved to:", path);
            ToastAndroid.show(
              "Document downloaded and saved.",
              ToastAndroid.LONG
            );
          })
          .catch((error) => {
            console.log("Error saving PDF:", error);
            ToastAndroid.show("Error saving document.", ToastAndroid.LONG);
          });
      },
      (error) => {
        console.log("Error deleting document: ", error);
      }
    );
  }

  // Function to handle document deletion with confirmation
  const handleDeleteDocument = (doc: Document) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this document?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            httpDelete(
              "/cars/" + car.plate + "/documents/" + doc.filename
            ).then(
              (response: any) => {
                setDocuments(
                  documents.filter((d) => d.filename !== doc.filename)
                );
              },
              (error) => {
                console.log("Error deleting document: ", error);
              }
            );
          },
          style: "destructive",
        },
      ]
    );
  };

  /** Just missing the document header above the page with the arrow to go a page back */
  return (
    <View style={styles.container}>
      {documents.length === 0 && <Text>No documents added...</Text>}
      {/** condition && //stuff we want to render */}
      <View style={styles.documentsContainer}>
        {/** We will have several of these document views. Each one represents a document */}
        {documents.map((document, index) => (
          <View key={index} style={styles.document}>
            <Text>{document.filename}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleDownload(document)}>
                <MaterialIcons name="cloud-download" size={20} color="green" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => handleDeleteDocument(document)}
              >
                <MaterialIcons name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <AddDocumentModal
        car={car}
        visible={isAddDocumentModalVisible}
        onClose={() => setAddDocumentModalVisible(false)}
        onConfirm={() => handleAddDocument}
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
    backgroundColor: "rgba(33,150,243,1.00)",
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

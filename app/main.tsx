import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { DefaultTopBar } from "../components/DefaultTopBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CarList from "@/components/CarList";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const toggleSearchBar = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <DefaultTopBar
      leftComponent={<MaterialIcons name="menu" size={24} />}
      children={<Text style={styles.topText}>My Cars</Text>}
      body={
        <>
          {isSearchActive && (
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search cars..."
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
            </View>
          )}
          <CarList searchQuery={searchQuery} />
        </>
      }
      rightComponent={
        <MaterialIcons name="search" size={24} onPress={toggleSearchBar} />
      }
    />
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  searchBar: {
    position: "absolute",
    top: 17,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    paddingTop: 0,
    borderRadius: 8,
    marginBottom: 10,
  },
});

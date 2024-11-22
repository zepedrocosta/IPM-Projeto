import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ToastAndroid,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SideMenu = ({
  onLogout,
  onClose,
}: {
  onLogout: () => void;
  onClose: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const slideAnimation = new Animated.Value(-Dimensions.get("window").width);

  React.useEffect(() => {
    // Animate menu opening
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeMenu = () => {
    Animated.timing(slideAnimation, {
      toValue: -Dimensions.get("window").width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity style={styles.overlay} onPress={closeMenu} />

      {/* Animated Side Menu */}
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnimation }],
            marginTop: insets.top,
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Close Icon */}
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <MaterialIcons name="arrow-back" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContent}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                ToastAndroid.show(
                  "Profile not Implemented",
                  ToastAndroid.SHORT
                );
              }}
            >
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                ToastAndroid.show(
                  "Settings not Implemented",
                  ToastAndroid.SHORT
                );
              }}
            >
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[
              styles.logoutButton,
              { flexDirection: "row", alignItems: "center" },
            ]}
            onPress={() => {
              closeMenu();
              onLogout();
            }}
          >
            <MaterialIcons
              name="logout"
              size={24}
              color="red"
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "rgba(230, 230, 230, 1)",
    zIndex: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 4,
    elevation: 5,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  icon: {
    color: "#007aff",
  },
  menuContent: {
    flex: 1, // Pushes the logout button to the bottom
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
  },
  logoutButton: {
    paddingVertical: 12,
    alignSelf: "flex-start", // Aligns to the left
    marginBottom: 16, // Adds spacing from the bottom
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default SideMenu;

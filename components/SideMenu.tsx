import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

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
        style={[styles.menu, { transform: [{ translateX: slideAnimation }] }]}
      >
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
          <Text style={styles.menuHeader}>Menu</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeMenu();
              console.log("Navigate to Profile");
            }}
          >
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeMenu();
              console.log("Navigate to Settings");
            }}
          >
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeMenu();
              onLogout();
            }}
          >
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
    width: Dimensions.get("window").width * 0.75,
    backgroundColor: "#fff",
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default SideMenu;

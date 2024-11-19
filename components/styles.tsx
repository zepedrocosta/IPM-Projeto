import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: -30,
  },
  CarName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  licencePlate: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  serviceBox: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    minWidth: 400,
  },
  PageTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemBox: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 16,
    color: "gray",
    alignSelf: "flex-end",
  },
  itemKm: {
    fontSize: 16,
    color: "gray",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007BFF",
    height: 35,
    width: 250,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    textAlign: "center",
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 20,
  },
});

export default styles;

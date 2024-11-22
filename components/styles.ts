import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  itemsBox: {
    flex: 1,
    alignContent: "center",
    width: "100%",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    minWidth: 350,
  },
  PageTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemBox: {
    paddingVertical: 20,
    borderBottomWidth: 2,
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
    height: 50,
    width: 150,
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
  datePickerContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateLabel: {
    fontSize: 16,
    flex: 1,
  },
  datePickerButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  datePickerButtonText: {
    color: "white",
    fontSize: 16,
  },
  bottomTyreInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
  },
  detailsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
  },
  tyreStatus: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  carImage: {
    width: 200,
    height: 300, // Adjust to match your image size
    resizeMode: "contain",
  },
  verticalTyreInfo: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: 300, // Match the car image height
  },
  tyreText: {
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tyrePressureText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row", // Align items in a row
    justifyContent: "space-evenly",
    alignItems: "center", // Center items vertically if needed
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
  },
});

export default styles;

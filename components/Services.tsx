import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { httpGet } from "@/utils/http";
import styles from "./styles";
import Car from "@/app/car";

type Service = {
  dueDate: string;
  dueKms: number;
  type: string;
};

export default function ServicesPage({ car }: { car: Car }) {
  const [oilChange, setOilChange] = useState<Service>();
  const [brakeChange, setBrakeChange] = useState<Service>();
  const [inspection, setInspection] = useState<Service>();
  const [vehicleCheck, setVehicleCheck] = useState<Service>();

  useEffect(() => {
    httpGet("/cars/" + car.plate + "/services").then(
      (res: any) => {
        res.data.forEach((service: any) => {
          switch (service.type) {
            case "OIL_CHANGE":
              setOilChange(service);
              break;
            case "BRAKE_CHANGE":
              setBrakeChange(service);
              break;
            case "INSPECTION":
              setInspection(service);
              break;
            case "VEHICLE_CHECKUP":
              setVehicleCheck(service);
              break;
            default:
              console.warn(`Unhandled service type: ${service.type}`);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const navigateToScheduleInspection = () => {
    router.push({
      pathname: "/scheduleinspection",
      params: {
        imageURL:
          car.imageURL ||
          "https://as1.ftcdn.net/v2/jpg/04/62/93/66/1000_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg",
        brand: car.brand,
        model: car.model,
        year: car.year.toString(),
        plate: car.plate,
      },
    });
  };

  const navigateToTyreService = () => {
    router.push("/tyreservice")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.CarName}>{car.brand}</Text>
      <Text style={styles.CarName}>{car.model}</Text>
      <Text style={styles.licencePlate}>({car.plate})</Text>

      <View style={styles.serviceBox}>
        <Text style={styles.PageTitle}>Next Service</Text>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Engine Oil</Text>
          <Text style={styles.itemDate}>
            Date: {oilChange?.dueDate || "N/A"}
          </Text>
          <Text style={styles.itemKm}>Kms: {oilChange?.dueKms || "N/A"}</Text>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Brake Service</Text>
          <Text style={styles.itemDate}>
            Date: {brakeChange?.dueDate || "N/A"}
          </Text>
          <Text style={styles.itemKm}>Kms: {brakeChange?.dueKms || "N/A"}</Text>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Inspection (IPO)</Text>
          <Text style={styles.itemDate}>
            Date: {inspection?.dueDate || "N/A"}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={navigateToScheduleInspection}
            >
              Schedule Inspection
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>Vehicle Check</Text>
          <Text style={styles.itemDate}>
            Date: {vehicleCheck?.dueDate || "N/A"}
          </Text>
          <Text style={styles.itemKm}>
            Kms: {vehicleCheck?.dueKms || "N/A"}
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={navigateToTyreService}>
            Tyre Service
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

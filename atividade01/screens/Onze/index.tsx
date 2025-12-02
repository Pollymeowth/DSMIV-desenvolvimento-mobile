import React from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import image from "../../assets/fatec.png";

const Onze: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.image} source={image} resizeMode="contain" />
        <Text style={styles.title}>HOME</Text>
        <View style={styles.rowButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Um")}
          >
            <Text style={styles.buttonLabel}>Um</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Dois")}
          >
            <Text style={styles.buttonLabel}>Dois</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Três")}
          >
            <Text style={styles.buttonLabel}>Três</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Quatro")}
          >
            <Text style={styles.buttonLabel}>Quatro</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Cinco")}
          >
            <Text style={styles.buttonLabel}>Cinco</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Seis")}
          >
            <Text style={styles.buttonLabel}>Seis</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Sete")}
          >
            <Text style={styles.buttonLabel}>Sete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Oito")}
          >
            <Text style={styles.buttonLabel}>Oito</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Nove")}
          >
            <Text style={styles.buttonLabel}>Nove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Dez")}
          >
            <Text style={styles.buttonLabel}>Dez</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onze;

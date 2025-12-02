import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { api } from "../../src/services/api";
import { useRouter } from "expo-router";

export default function CourseCreate() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [duration, setDuration] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!name) return Alert.alert("Validação", "Nome é obrigatório");
    try {
      await api.post("/courses", { name, area, duration: duration ? Number(duration) : undefined, coordinator });
      router.push("/courses");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível criar o curso");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Curso</Text>

      <TextInput placeholder="Nome" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Área" style={styles.input} value={area} onChangeText={setArea} />
      <TextInput placeholder="Duração (semestres)" style={styles.input} value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <TextInput placeholder="Coordenador" style={styles.input} value={coordinator} onChangeText={setCoordinator} />

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  input: { height: 50, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 12 }
});

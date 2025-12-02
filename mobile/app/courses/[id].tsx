import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { api } from "../../src/services/api";
import { useRouter, useLocalSearchParams } from "expo-router";

type Params = { id: string };

export default function CourseEdit() {
  const { id } = useLocalSearchParams<Params>();
  const [course, setCourse] = useState<any>(null);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [duration, setDuration] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const router = useRouter();

  const load = async () => {
    try {
      const resp = await api.get(`/courses/${id}`);
      setCourse(resp.data.course);
      setName(resp.data.course.name || "");
      setArea(resp.data.course.area || "");
      setDuration(resp.data.course.duration ? String(resp.data.course.duration) : "");
      setCoordinator(resp.data.course.coordinator || "");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar o curso");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleSave = async () => {
    if (!name) return Alert.alert("Validação", "Nome é obrigatório");
    try {
      await api.put(`/courses/${id}`, { name, area, duration: duration ? Number(duration) : undefined, coordinator });
      router.push("/courses");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar o curso");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Curso</Text>

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

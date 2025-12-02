import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { api } from "../../src/services/api";
import { AuthContext } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";

type Course = {
  id: number;
  name: string;
  area?: string;
  duration?: number;
  coordinator?: string;
};

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const load = async () => {
    try {
      const resp = await api.get("/courses");
      setCourses(resp.data.courses || []);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar cursos");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Confirmar", "Remover curso?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/courses/${id}`);
            load();
          } catch (e) {
            Alert.alert("Erro", "Não foi possível remover o curso");
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos</Text>

      {user?.role === "admin" && (
        <Button title="Criar curso" onPress={() => router.push("/courses/create")} />
      )}

      <FlatList
        data={courses}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.area || "-"} • {item.duration ? `${item.duration} sem.` : "-"}</Text>
            </View>

            <TouchableOpacity onPress={() => router.push(`/courses/${item.id}`)} style={styles.btn}>
              <Text>Editar</Text>
            </TouchableOpacity>

            {user?.role === "admin" && (
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.btn, { marginLeft: 8 }]}>
                <Text>Remover</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderColor: "#eee" },
  name: { fontSize: 16, fontWeight: "600" },
  meta: { color: "#666" },
  btn: { padding: 8, backgroundColor: "#ddd", borderRadius: 6 }
});

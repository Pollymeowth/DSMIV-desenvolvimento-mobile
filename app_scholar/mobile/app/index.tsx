import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext, AuthProvider } from "../src/context/AuthContext";
import { Link } from "expo-router";

function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (e: any) {
      alert(e?.response?.data?.error || "Erro ao logar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login App Scholar</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Entrar" onPress={handleLogin} />
      <Link href="/home">Ir para Home</Link>
    </View>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, textAlign: "center", marginBottom: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { AuthContext, AuthProvider } from "../src/context/AuthContext";
import { Link } from "expo-router";

function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log("Attempting signIn", { email });
      await signIn(email, password);
      console.log("signIn succeeded");
    } catch (e: any) {
      console.error("signIn error", e);
      alert(e?.response?.data?.error || "Erro ao logar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Login App Scholar</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        editable={!loading}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        editable={!loading}
      />

      <View style={{ marginTop: 8 }}>
        <Button title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} disabled={loading} />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}

      <View style={{ marginTop: 12 }}>
        <Link href="/home">Ir para Home</Link>
      </View>
    </KeyboardAvoidingView>
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

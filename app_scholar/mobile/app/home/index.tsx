import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vinda, {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
    </View>
  );
}

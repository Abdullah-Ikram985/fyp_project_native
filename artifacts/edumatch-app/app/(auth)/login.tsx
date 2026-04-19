import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "@/contexts/AuthContext";
import { useColors } from "@/hooks/useColors";

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(name, email, password);
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/(tabs)");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header gradient */}
      <LinearGradient
        colors={["#1e1b4b", "#2e1a6e"]}
        style={[styles.header, { paddingTop: topInset + 20 }]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="rgba(196,181,253,0.8)" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.logoSmall}>
            <LinearGradient colors={["#7c3aed", "#a855f7"]} style={styles.logoSmallGradient}>
              <Ionicons name="school" size={18} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={styles.headerTitle}>EduMatch AI</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          {mode === "signin" ? "Welcome back, scholar" : "Join thousands of faculty candidates"}
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.body}
        contentContainerStyle={[styles.bodyContent, { paddingBottom: bottomInset + 24 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Tab Toggle */}
        <View style={styles.tabToggle}>
          {(["signin", "register"] as const).map((m) => (
            <Pressable
              key={m}
              style={[styles.tab, mode === m && styles.tabActive]}
              onPress={() => { setMode(m); setError(""); }}
            >
              <Text style={[styles.tabText, mode === m && styles.tabTextActive]}>
                {m === "signin" ? "Sign In" : "Register"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Fields */}
        <View style={styles.form}>
          {mode === "register" && (
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="person-outline" size={18} color="#8b7dc0" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Dr. Your Name"
                  placeholderTextColor="#c4b5fd"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>
          )}

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={18} color="#8b7dc0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="you@university.edu"
                placeholderTextColor="#c4b5fd"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Password</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={18} color="#8b7dc0" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="••••••••"
                placeholderTextColor="#c4b5fd"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#8b7dc0" />
              </TouchableOpacity>
            </View>
          </View>

          {mode === "signin" && (
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          {error !== "" && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={14} color="#ef4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Submit */}
          <Pressable
            style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.88 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <LinearGradient colors={["#7c3aed", "#6d28d9"]} style={styles.submitGradient}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitText}>
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </Text>
              )}
            </LinearGradient>
          </Pressable>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google */}
          <TouchableOpacity style={styles.socialBtn} onPress={() => router.replace("/(tabs)")}>
            <Ionicons name="logo-google" size={20} color="#1e1b4b" />
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {" "}and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8f7ff" },
  header: { paddingHorizontal: 24, paddingBottom: 32 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerContent: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  logoSmall: {},
  logoSmallGradient: { width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: "#ffffff" },
  headerSubtitle: { fontSize: 14, color: "rgba(196,181,253,0.8)", fontFamily: "Inter_400Regular" },
  body: { flex: 1 },
  bodyContent: { padding: 24 },
  tabToggle: {
    flexDirection: "row",
    backgroundColor: "#ede9fe",
    borderRadius: 14,
    padding: 4,
    marginBottom: 28,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  tabActive: { backgroundColor: "#ffffff", shadowColor: "#7c3aed", shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 4 },
  tabText: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#8b7dc0" },
  tabTextActive: { color: "#7c3aed" },
  form: { gap: 16 },
  fieldGroup: { gap: 6 },
  fieldLabel: { fontSize: 12, fontFamily: "Inter_600SemiBold", color: "#4c1d95", textTransform: "uppercase", letterSpacing: 0.5 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e5e0f8",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular", color: "#1e1b4b" },
  eyeBtn: { padding: 4 },
  forgotBtn: { alignSelf: "flex-end" },
  forgotText: { fontSize: 13, color: "#7c3aed", fontFamily: "Inter_500Medium" },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fef2f2",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: { fontSize: 13, color: "#ef4444", fontFamily: "Inter_400Regular", flex: 1 },
  submitBtn: { borderRadius: 16, overflow: "hidden", marginTop: 4 },
  submitGradient: { paddingVertical: 17, alignItems: "center", justifyContent: "center" },
  submitText: { fontSize: 16, fontFamily: "Inter_700Bold", color: "#ffffff" },
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e5e0f8" },
  dividerText: { fontSize: 12, color: "#8b7dc0", fontFamily: "Inter_400Regular" },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e5e0f8",
    borderRadius: 14,
    paddingVertical: 15,
  },
  socialBtnText: { fontSize: 15, fontFamily: "Inter_600SemiBold", color: "#1e1b4b" },
  terms: { marginTop: 20, textAlign: "center", fontSize: 12, color: "#8b7dc0", fontFamily: "Inter_400Regular", lineHeight: 18 },
  termsLink: { color: "#7c3aed", fontFamily: "Inter_500Medium" },
});

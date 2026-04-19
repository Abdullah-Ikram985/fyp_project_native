import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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

const INITIAL_SKILLS = ["Python", "Machine Learning", "NLP", "TensorFlow", "Deep Learning", "Data Analysis"];

export default function EditProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "Dr. Aisha Raza");
  const [title, setTitle] = useState(user?.title ?? "Assistant Professor");
  const [institution, setInstitution] = useState(user?.institution ?? "IISAT University");
  const [dept, setDept] = useState("Computer Science");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [city, setCity] = useState("Lahore, Pakistan");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/aisharaza");
  const [website, setWebsite] = useState("aisharaza.dev");
  const [bio, setBio] = useState("AI researcher and educator with 6+ years of experience in machine learning, NLP, and deep learning. Published 12 research papers in top-tier conferences.");
  const [skills, setSkills] = useState<string[]>(INITIAL_SKILLS);
  const [newSkill, setNewSkill] = useState("");

  const topInset = Platform.OS === "web" ? 67 : insets.top;
  const bottomInset = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSave = () => {
    updateUser({ name, title, institution });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (s: string) => {
    setSkills(skills.filter((x) => x !== s));
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={["#1e1b4b", "#2e1a6e"]} style={[styles.header, { paddingTop: topInset + 12 }]}>
        <View style={styles.headerDecor} />
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="rgba(196,181,253,0.9)" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <LinearGradient colors={["#7c3aed", "#6d28d9"]} style={styles.saveBtnGrad}>
              <Text style={styles.saveBtnText}>Save</Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.profileInitials ?? "AR"}</Text>
            </View>
            <TouchableOpacity style={styles.cameraBtn}>
              <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>Tap to change photo</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomInset + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Personal Info */}
        <SectionCard title="Personal Information" icon="person-outline" iconColor="#7c3aed" iconBg="#f0eeff" colors={colors}>
          <Field label="Full Name" value={name} onChangeText={setName} colors={colors} />
          <Field label="Title / Designation" value={title} onChangeText={setTitle} colors={colors} />
          <Field label="Current Institution" value={institution} onChangeText={setInstitution} colors={colors} />
          <Field label="Department" value={dept} onChangeText={setDept} colors={colors} last />
        </SectionCard>

        {/* Contact */}
        <SectionCard title="Contact Details" icon="mail-outline" iconColor="#3b82f6" iconBg="#eff6ff" colors={colors}>
          <Field label="Email Address" value={email} onChangeText={setEmail} colors={colors} keyboardType="email-address" icon="mail-outline" />
          <Field label="Phone Number" value={phone} onChangeText={setPhone} colors={colors} keyboardType="phone-pad" icon="call-outline" />
          <Field label="City, Country" value={city} onChangeText={setCity} colors={colors} icon="location-outline" last />
        </SectionCard>

        {/* Online Presence */}
        <SectionCard title="Online Presence" icon="globe-outline" iconColor="#10b981" iconBg="#f0fdf4" colors={colors}>
          <Field label="LinkedIn Profile" value={linkedin} onChangeText={setLinkedin} colors={colors} icon="logo-linkedin" />
          <Field label="Personal Website" value={website} onChangeText={setWebsite} colors={colors} icon="globe-outline" last />
        </SectionCard>

        {/* Skills */}
        <SectionCard title="Skills" icon="code-slash-outline" iconColor="#f59e0b" iconBg="#fffbeb" colors={colors}>
          <View style={styles.skillsWrap}>
            {skills.map((s) => (
              <View key={s} style={styles.skillPill}>
                <Text style={styles.skillText}>{s}</Text>
                <TouchableOpacity onPress={() => removeSkill(s)} style={styles.skillRemove}>
                  <Ionicons name="close" size={12} color="#7c3aed" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.addSkillRow}>
            <TextInput
              style={[styles.addSkillInput, { borderColor: colors.border, color: colors.foreground }]}
              placeholder="Add a skill..."
              placeholderTextColor={colors.mutedForeground}
              value={newSkill}
              onChangeText={setNewSkill}
              onSubmitEditing={addSkill}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={addSkill} style={styles.addSkillBtn}>
              <LinearGradient colors={["#7c3aed", "#6d28d9"]} style={styles.addSkillBtnGrad}>
                <Ionicons name="add" size={18} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SectionCard>

        {/* Bio */}
        <SectionCard title="Professional Bio" icon="document-text-outline" iconColor="#ef4444" iconBg="#fef2f2" colors={colors}>
          <TextInput
            style={[styles.bioInput, { borderColor: colors.border, color: colors.foreground, backgroundColor: colors.background }]}
            multiline
            numberOfLines={5}
            value={bio}
            onChangeText={setBio}
            textAlignVertical="top"
            placeholder="Describe your academic background and research interests..."
            placeholderTextColor={colors.mutedForeground}
          />
          <Text style={[styles.bioCount, { color: colors.mutedForeground }]}>{bio.length} / 500</Text>
        </SectionCard>

        {/* Preferences */}
        <SectionCard title="Job Preferences" icon="options-outline" iconColor="#8b5cf6" iconBg="#f5f3ff" colors={colors}>
          {[
            { label: "Preferred Roles", value: "Assistant / Associate Professor" },
            { label: "Preferred Subjects", value: "AI, ML, Data Science" },
            { label: "Job Type", value: "Full-time, Remote" },
            { label: "Expected Salary", value: "PKR 2,50,000 / month" },
          ].map((item, i, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.prefItem, i < arr.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
            >
              <View style={styles.prefMeta}>
                <Text style={[styles.prefLabel, { color: colors.mutedForeground }]}>{item.label}</Text>
                <Text style={[styles.prefValue, { color: colors.foreground }]}>{item.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </SectionCard>

        {/* Save */}
        <Pressable
          style={({ pressed }) => [styles.saveFullBtn, pressed && { opacity: 0.88 }]}
          onPress={handleSave}
        >
          <LinearGradient colors={["#1e1b4b", "#2e1a6e"]} style={styles.saveFullGrad}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
            <Text style={styles.saveFullText}>Save Changes</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SectionCard({
  title, icon, iconColor, iconBg, children, colors
}: {
  title: string; icon: string; iconColor: string; iconBg: string; children: React.ReactNode; colors: any;
}) {
  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIconWrap, { backgroundColor: iconBg }]}>
          <Ionicons name={icon as any} size={16} color={iconColor} />
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Field({
  label, value, onChangeText, colors, icon, keyboardType, last
}: {
  label: string; value: string; onChangeText: (v: string) => void; colors: any; icon?: string; keyboardType?: any; last?: boolean;
}) {
  return (
    <View style={[styles.fieldGroup, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>{label}</Text>
      <View style={styles.fieldInputRow}>
        {icon && <Ionicons name={icon as any} size={15} color={colors.mutedForeground} style={{ marginRight: 8 }} />}
        <TextInput
          style={[styles.fieldInput, { color: colors.foreground }]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType ?? "default"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 24, overflow: "hidden" },
  headerDecor: { position: "absolute", top: -20, right: -40, width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(124,58,237,0.15)" },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontFamily: "Inter_700Bold", color: "#ffffff" },
  saveBtn: { borderRadius: 20, overflow: "hidden" },
  saveBtnGrad: { paddingHorizontal: 16, paddingVertical: 8 },
  saveBtnText: { fontSize: 13, fontFamily: "Inter_700Bold", color: "#ffffff" },
  avatarSection: { alignItems: "center", gap: 8 },
  avatarWrap: { position: "relative" },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: "#7c3aed", alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "rgba(255,255,255,0.2)" },
  avatarText: { fontSize: 26, fontFamily: "Inter_700Bold", color: "#ffffff" },
  cameraBtn: { position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: "#7c3aed", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#1e1b4b" },
  avatarHint: { fontSize: 11, color: "rgba(196,181,253,0.7)", fontFamily: "Inter_400Regular" },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  sectionCard: { borderRadius: 18, padding: 16, shadowColor: "#1e1b4b", shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  sectionIconWrap: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  sectionTitle: { fontSize: 15, fontFamily: "Inter_700Bold" },
  fieldGroup: { paddingVertical: 12 },
  fieldLabel: { fontSize: 10, fontFamily: "Inter_600SemiBold", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 5 },
  fieldInputRow: { flexDirection: "row", alignItems: "center" },
  fieldInput: { flex: 1, fontSize: 14, fontFamily: "Inter_500Medium" },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  skillPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#ede9fe", paddingLeft: 12, paddingRight: 8, paddingVertical: 6, borderRadius: 20 },
  skillText: { fontSize: 12, fontFamily: "Inter_600SemiBold", color: "#7c3aed" },
  skillRemove: { padding: 1 },
  addSkillRow: { flexDirection: "row", gap: 8 },
  addSkillInput: { flex: 1, height: 40, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 12, fontSize: 13, fontFamily: "Inter_400Regular" },
  addSkillBtn: { borderRadius: 12, overflow: "hidden" },
  addSkillBtnGrad: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  bioInput: { borderWidth: 1.5, borderRadius: 12, padding: 12, fontSize: 13, fontFamily: "Inter_400Regular", minHeight: 110 },
  bioCount: { textAlign: "right", fontSize: 10, fontFamily: "Inter_400Regular", marginTop: 4 },
  prefItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  prefMeta: { flex: 1 },
  prefLabel: { fontSize: 10, fontFamily: "Inter_600SemiBold", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 3 },
  prefValue: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  saveFullBtn: { borderRadius: 16, overflow: "hidden", marginTop: 4 },
  saveFullGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 17 },
  saveFullText: { fontSize: 16, fontFamily: "Inter_700Bold", color: "#ffffff" },
});

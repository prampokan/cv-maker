"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Mendefinisikan styles untuk PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  name: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textTransform: "uppercase",
  },
  content: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#444",
  },
});

// Komponen PDF
const CVPreview = ({ name, about, education, skills }: any) => (
  <PDFViewer className="w-full h-screen">
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>About</Text>
          <Text style={styles.content}>{about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          <Text style={styles.content}>{education}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text style={styles.content}>{skills}</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default function Edit() {
  const [name, setName] = useState("Pramudya Diagusta");
  const [about, setAbout] = useState(
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, nihil doloribus. Dicta aliquam et vitae aut fugit dolore in, itaque delectus, deserunt sed facere similique velit maxime ab illum repudiandae."
  );
  const [education, setEducation] = useState(
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, nihil doloribus. Dicta aliquam et vitae aut fugit dolore in, itaque delectus, deserunt sed facere similique velit maxime ab illum repudiandae."
  );
  const [skills, setSkills] = useState(
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, nihil doloribus. Dicta aliquam et vitae aut fugit dolore in, itaque delectus, deserunt sed facere similique velit maxime ab illum repudiandae."
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 border-r">
        <form>
          <Label>Nama Lengkap</Label>
          <Input
            type="text"
            placeholder="contoh: Pramudya Diagusta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
          />
          <Label>About</Label>
          <Textarea
            placeholder="contoh: i am a bla bla bla..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="mb-3"
          />
          <Label>Education</Label>
          <Textarea
            placeholder="contoh: Universitas Indonesia"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="mb-3"
          />
          <Label>Skills</Label>
          <Textarea
            placeholder="contoh: HTML CSS"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="mb-3"
          />
        </form>
      </div>

      {/* PDF Preview */}
      <div className="p-4">
        <CVPreview
          name={name}
          about={about}
          education={education}
          skills={skills}
        />
      </div>
    </div>
  );
}

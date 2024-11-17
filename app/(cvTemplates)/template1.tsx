import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

interface TemplateProps {
  name: string;
  about: string;
  education: string;
  skills: string;
}

export default function Template1({
  name,
  about,
  education,
  skills,
}: TemplateProps) {
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

  return (
    <PDFViewer className="w-full h-[65rem]">
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.section}>
            {about && <Text style={styles.heading}>About</Text>}
            <Text style={styles.content}>{about}</Text>
          </View>

          <View style={styles.section}>
            {education && <Text style={styles.heading}>Education</Text>}
            <Text style={styles.content}>{education}</Text>
          </View>

          <View style={styles.section}>
            {skills && <Text style={styles.heading}>Skills</Text>}
            <Text style={styles.content}>{skills}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

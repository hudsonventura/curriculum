import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Curriculum } from '../components/Curriculum';



const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 30,
        fontSize: 11,
        fontFamily: 'Helvetica',
        backgroundColor: '#f9f9f9',
    },
    leftColumn: {
        width: '35%',
        padding: 15,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderRight: '1 solid #e0e0e0',
    },
    rightColumn: {
        width: '65%',
        paddingLeft: 20,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    text: {
        marginBottom: 5,
        color: '#555',
        lineHeight: 0.9,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },

    // Timeline
    timelineContainer: {
        flexDirection: 'column',
        borderLeft: '2 solid #3498db',
        paddingLeft: 10,
        gap: 20,
    },
    timelineItem: {
        position: 'relative',
        paddingLeft: 10,
    },
    timelineDot: {
        width: 9,
        height: 9,
        borderRadius: 4,
        backgroundColor: '#3498db',
        position: 'absolute',
        left: -15.5,
        top: 4,
    },
    companyName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 4,
    },
    roleContainer: {
        margin: 0,
        marginLeft: 12,
    },
    roleTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#333',
    },
    rolePeriod: {
        fontSize: 10,
        color: '#888',
        margin: 0,
        marginBottom: 0
    },
});

function Print({curriculum} : Curriculum) {



    return (
        <div className="w-full h-screen">
            <PDFViewer width="100%" height="100%">
                <Document>
                    <Page size="A4" style={styles.page}>
                        {/* Coluna Esquerda */}
                        <View style={styles.leftColumn}>
                            <Text style={styles.name}>{curriculum.name}</Text>
                            <Text style={styles.text}>{curriculum.role}</Text>
                            <Text style={styles.text}>{curriculum.role2}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Contato</Text>
                            <Text style={styles.text}>{curriculum.email}</Text>
                            <Text style={styles.text}>{curriculum.phone}</Text>
                            <Text style={styles.text}>{curriculum.location}</Text>

                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Skills</Text>
                            {
                                curriculum.skills.map((skill, index) => (
                                    <Text key={index} style={styles.text}>{skill}</Text>
                                ))
                            }
                        </View>

                        {/* Coluna Direita */}
                        <View style={styles.rightColumn}>
                            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
                            <View style={styles.timelineContainer}>

                                {/* EMPRESA 1 */}
                                {
                                    curriculum.companies.map((company, index) => (
                                        <View style={styles.timelineItem}>
                                            <View style={styles.timelineDot} />
                                            <Text style={styles.companyName}>{company.name}</Text>

                                            {
                                                company.roles.map((role, index) => (
                                                    <View style={styles.roleContainer}>
                                                        <Text style={styles.roleTitle}>{role.role}</Text>
                                                        <Text style={styles.rolePeriod}>
                                                            {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(role.start))}
                                                        </Text>
                                                        <Text style={styles.text}>
                                                            {role.description}
                                                        </Text>
                                                    </View>
                                                ))
                                            }

                                        </View>
                                    ))
                                }
                                

                            </View>

                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Educação</Text>
                            {
                                curriculum.educations.map((education, index) => (
                                    <View style={styles.roleContainer}>
                                        <View style={styles.roleContainer}>
                                            <Text style={styles.roleTitle}>{education.degree}</Text>
                                            <Text style={styles.rolePeriod}>
                                            Formatura: {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(education.start))}
                                            </Text>
                                            <Text style={styles.text}>
                                                {education.school}
                                            </Text>
                                        </View>
    
                                    </View>
                                ))
                            }

                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Certificações</Text>
                            <Text style={styles.text}>• Certificado React Avançado - Alura</Text>
                            <Text style={styles.text}>• Docker Essentials - Udemy</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

export default Print;

import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Company, Curriculum, Roles } from '../components/Curriculum';
import StringsHandler from './StringsHandler';


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
    roleDescription: {
        position: 'absolute', 
        bottom: 10, 
        width: '100%', 
        //alignItems: 'left'
    },
});

function Print({curriculum, strings} : {curriculum: Curriculum, strings: StringsHandler}) {



    return (
        <div className="w-full h-screen">
            <PDFViewer width="100%" height="100%">
                <Document title={ `Curriculum Vitae ${curriculum.name}`} >
                    <Page size="A4" style={styles.page}>
                        {/* Coluna Esquerda */}
                        <View style={styles.leftColumn}>
                            <Text style={styles.name}>{curriculum.name}</Text>
                            <Text style={styles.text}>{curriculum.role}</Text>
                            <Text style={styles.text}>{curriculum.role2}</Text>
                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>{(strings as any)[31]}</Text>
                            <Text style={styles.text}>{curriculum.email}</Text>
                            <Text style={styles.text}>{curriculum.phone}</Text>
                            <Text style={styles.text}>Github: /{curriculum.nick}</Text>
                            <Text style={styles.text}>LinkedIn: /{curriculum.nick}</Text>


                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Skills</Text>
                            {
                                curriculum.skills.map(({name}, index) => (
                                    <Text key={index} style={styles.text}>{name}</Text>
                                ))
                            }

                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>{(strings as any)[35]}</Text>
                            <Text style={styles.text}>• {new Date().getFullYear() - new Date(curriculum.birth_date).getFullYear()} {(strings as any)[10]}</Text>
                            <Text style={styles.text}>• {curriculum.location}</Text>
                            <Text style={styles.text}>• {curriculum.education_level}</Text>

                            <View style={styles.roleDescription}>
                                <Text style={{ fontSize: 8, color: '#888' }}>
                                    {(strings as any)[34]} {new Intl.DateTimeFormat(navigator.language === 'pt-BR' ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())}
                                </Text>
                            </View>
                            
                        </View>

                        {/* Coluna Direita */}
                        <View style={styles.rightColumn}>
                            <Text style={styles.sectionTitle}>{(strings as any)[32]}</Text>
                            <View style={styles.timelineContainer}>

                                {/* EMPRESA 1 */}
                                {
                                    curriculum.companies.map((company: Company, index: number) => (
                                        <View key={index} style={styles.timelineItem}>
                                            <View style={styles.timelineDot} />
                                            <Text style={styles.companyName}>{company.name}</Text>

                                            {
                                                company.roles.map((role: Roles, index: number) => (
                                                    <View key={index} style={styles.roleContainer}>
                                                        <Text style={styles.roleTitle}>{role.role}</Text>
                                                        <Text style={styles.rolePeriod}>
                                                            {new Date(role.start).getFullYear()} - {new Date(role.end).getFullYear()}
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
                            <Text style={styles.sectionTitle}>{(strings as any)[33]}</Text>
                            {
                                curriculum.educations.map((education, index) => (
                                    <View key={index} style={styles.roleContainer}>
                                        <View style={styles.roleContainer}>
                                            <Text style={styles.roleTitle}>{education.degree}</Text>
                                            <Text style={styles.rolePeriod}>
                                                {new Date(education.start).getFullYear()} - {new Date(education.end).getFullYear()}
                                            </Text>
                                            <Text style={styles.text}>
                                                {education.school}
                                            </Text>
                                        </View>
    
                                    </View>
                                ))
                            }

                            
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

export default Print;


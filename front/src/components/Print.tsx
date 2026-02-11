import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Company, Curriculum, Roles } from '../components/Curriculum';
import StringsHandler from './StringsHandler';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 0,
        fontSize: 10,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    leftColumn: {
        width: '35%',
        padding: 25,
        paddingTop: 30,
        backgroundColor: '#f8fafb',
        borderRight: '3 solid #e8f0f5',
    },
    rightColumn: {
        width: '65%',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30,
        paddingBottom: 25,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a5490',
        marginBottom: 10,
        marginTop: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    text: {
        marginBottom: 6,
        color: '#4a5568',
        lineHeight: 1.4,
        fontSize: 9,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a365d',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    role: {
        fontSize: 11,
        color: '#2c5282',
        marginBottom: 4,
        fontWeight: 'bold',
    },
    role2: {
        fontSize: 9,
        color: '#4a5568',
        marginBottom: 12,
    },
    divider: {
        height: 2,
        backgroundColor: '#cbd5e0',
        marginVertical: 12,
    },
    thinDivider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 8,
    },

    // Timeline
    timelineContainer: {
        flexDirection: 'column',
        borderLeft: '3 solid #3182ce',
        paddingLeft: 10,
        gap: 16,
    },
    timelineItem: {
        position: 'relative',
        paddingLeft: 10,
        marginBottom: 8,
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3182ce',
        position: 'absolute',
        left: -16.5,
        top: 3,
        border: '2 solid #ffffff',
    },
    companyName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1a365d',
        marginBottom: 6,
    },
    roleContainer: {
        margin: 0,
        marginLeft: 10,
        marginBottom: 8,
    },
    roleTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 2,
    },
    rolePeriod: {
        fontSize: 8,
        color: '#718096',
        margin: 0,
        marginBottom: 4,
    },
    roleDescription: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },

    // Duolingo Stats
    duolingoContainer: {
        backgroundColor: '#edf7ed',
        padding: 10,
        borderRadius: 6,
        marginTop: 8,
        marginBottom: 8,
        borderLeft: '3 solid #48bb78',
    },
    duolingoTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2f855a',
        marginBottom: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    duolingoStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    duolingoStat: {
        textAlign: 'center',
        flex: 1,
    },
    duolingoStatValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2f855a',
        marginBottom: 2,
    },
    duolingoStatLabel: {
        fontSize: 7,
        color: '#4a5568',
    },
    duolingoCourse: {
        fontSize: 8,
        color: '#4a5568',
        marginBottom: 3,
    },


    // Card Styles para Print
    cardContact: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftStyle: 'solid',
        borderLeftColor: '#3182ce', // blue-500
    },
    cardSkills: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftStyle: 'solid',
        borderLeftColor: '#48bb78', // green-500
    },
    cardInfo: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftStyle: 'solid',
        borderLeftColor: '#9f7aea', // purple-500
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1a5490',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});

function Print({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) {

    return (
        <div className="w-full h-screen">
            <PDFViewer width="100%" height="100%">
                <Document title={`Curriculum Vitae ${curriculum.name}`} >
                    <Page size="A4" style={styles.page}>
                        {/* Coluna Esquerda */}
                        <View style={styles.leftColumn}>
                            <Text style={styles.name}>{curriculum.name}</Text>
                            <Text style={styles.role}>{curriculum.role}</Text>
                            <Text style={styles.role2}>{curriculum.role2}</Text>


                            {/* Card: Contact */}
                            <View style={styles.cardContact}>
                                <Text style={styles.cardTitle}>{(strings as any)[31]}</Text>
                                <Text style={styles.text}>{curriculum.email}</Text>
                                <Text style={styles.text}>{curriculum.phone}</Text>
                                <Text style={styles.text}>Github: /{curriculum.nick}</Text>
                                <Text style={styles.text}>LinkedIn: /{curriculum.nick}</Text>
                            </View>


                            {/* Card: Skills */}
                            <View style={styles.cardSkills}>
                                <Text style={styles.cardTitle}>Skills</Text>
                                {
                                    curriculum.skills.map(({ name }, index) => (
                                        <Text key={index} style={styles.text}>• {name}</Text>
                                    ))
                                }
                            </View>


                            {/* Card: Information */}
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>{(strings as any)[35]}</Text>
                                <Text style={styles.text}>• {new Date().getFullYear() - new Date(curriculum.birth_date).getFullYear()} {(strings as any)[10]}</Text>
                                <Text style={styles.text}>• {curriculum.location}</Text>
                                <Text style={styles.text}>• {curriculum.education_level}</Text>
                                <Text style={styles.text}>• English level: {curriculum.english_level}</Text>
                            </View>



                            <View style={styles.roleDescription}>
                                <Text style={{ fontSize: 7, color: '#718096' }}>
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
                                            <Text style={styles.companyName}>{company.name}
                                                {
                                                    company.subname && (
                                                        <Text style={styles.text}> {company.subname}</Text>
                                                    )
                                                }</Text>


                                            {
                                                company.roles.map((role: Roles, index: number) => (
                                                    <View key={index} style={styles.roleContainer}>
                                                        <Text style={styles.roleTitle}>{role.role}</Text>
                                                        <Text style={styles.rolePeriod}>
                                                            {new Date(role.start).getFullYear()} - {typeof role.end === 'string' ? role.end : new Date(role.end).getFullYear()}
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
                                                {new Date(education.start).getFullYear()} - {typeof education.end === 'string' ? education.end : new Date(education.end).getFullYear()}
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


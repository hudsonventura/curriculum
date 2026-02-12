import { About } from "./components/About";
import { Cta } from "./components/Cta";

import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";

import { ScrollToTop } from "./components/ScrollToTop";

import { Testimonials } from "./components/Testimonials";
import { TravelTunnel } from "./components/TravelTunnel";
import { CardScanner } from "./components/CardScanner";
import "./App.css";

import Print from "./components/Print";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import curriculumJSONFile from './locales/PT/curriculum.json';
import stringsPT from './locales/PT/strings.json';

import curriculumJSONFileEN from './locales/EN/curriculum.json';
import stringsEN from './locales/EN/strings.json';
import StringsHandler from "./components/StringsHandler";

import { Curriculum } from './components/Curriculum';
import { useEffect, useState } from "react";

import ConstellationBackground from './components/ConstellationBackground';
import { Helmet } from 'react-helmet';
import { Preview } from "./components/Preview";
import Respositories from "./components/Repositories";


function App() {




	const language = navigator.language || navigator.language;
	const curriculum: Curriculum = {
		...language === 'pt-BR' ? curriculumJSONFile : curriculumJSONFileEN,
		companies: (language === 'pt-BR' ? curriculumJSONFile : curriculumJSONFileEN).companies.map(company => ({
			...company,
			roles: company.roles.map(role => ({
				...role,
				start: new Date(role.start),
				end: role.end ? new Date(role.end) : (language === 'pt-BR' ? 'até o momento' : 'present')
			}))
		})),
		educations: (language === 'pt-BR' ? curriculumJSONFile : curriculumJSONFileEN).educations.map(education => ({
			...education,
			start: new Date(education.start),
			end: education.end ? new Date(education.end) : (language === 'pt-BR' ? 'até o momento' : 'present')
		})),
		birth_date: new Date((language === 'pt-BR' ? curriculumJSONFile : curriculumJSONFileEN).birth_date)
	};
	const strings = new StringsHandler(language === 'pt-BR' ? stringsPT : stringsEN);





	const [repos, setRepos] = useState<Respositories>({
		github: [],
		folower: [],
		nugetLibs: [],
		nugetProfile: [],
		pypiLibs: []
	});

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const response = await fetch("https://api.github.com/users/hudsonventura/repos");
				const data = await response.json();
				setRepos((prev: Respositories) => ({ ...prev, github: data }));
			} catch (error) {
				console.error("Error fetching repos:", error);
			}
		};

		const fetchFolowers = async () => {
			try {
				const response = await fetch("https://api.github.com/users/hudsonventura/followers");
				const data = await response.json();
				setRepos((prev: Respositories) => ({ ...prev, folower: data }));
			} catch (error) {
				console.error("Error fetching followers:", error);
			}
		};

		const fetchNugetLibs = async () => {
			try {
				const response = await fetch("https://azuresearch-usnc.nuget.org/query?q=packageid:softexpertapi");
				const data = await response.json();
				setRepos((prev: Respositories) => ({ ...prev, nugetLibs: data }));
			} catch (error) {
				console.error("Error fetching NuGet libs:", error);
			}
		};

		const fetchNugetLibsProfile = async () => {
			try {
				const response = await fetch("https://api-v2v3search-0.nuget.org/query?q=owner:hudsonventura");
				const data = await response.json();
				setRepos((prev: Respositories) => ({ ...prev, nugetProfile: data }));
			} catch (error) {
				console.error("Error fetching NuGet profile:", error);
			}
		};

		fetchRepos();
		fetchFolowers();
		fetchNugetLibs();
		fetchNugetLibsProfile();

		// Register visit on the backend
		fetch("http://hudsonventura.ddnsfree.com:5000/status?check=1").catch((err) => console.error("Error registering visit:", err));
	}, []);

	return (

		<Router>
			<Helmet>
				{/* Basic Meta Tags */}
				<html lang={language === 'pt-BR' ? 'pt-BR' : 'en'} />
				<title>{`${curriculum.name} - ${curriculum.role} | Full Stack Developer Portfolio`}</title>
				<meta name="description" content={`${curriculum.name} is a ${curriculum.role} specializing in ${curriculum.role2}. Experienced in building scalable web applications, APIs, and modern interfaces. View my portfolio, projects, and professional experience.`} />
				<meta name="author" content={curriculum.name} />
				<meta name="keywords" content={`${curriculum.name}, ${curriculum.nick}, Full Stack Developer, ${curriculum.skills.map(skill => skill.name).join(", ")}, Portfolio, Resume, CV, ${curriculum.location}, Software Engineer, Web Developer`} />
				<meta name="robots" content="index, follow" />
				<meta name="googlebot" content="index, follow" />
				<link rel="canonical" href={curriculum.website} />

				{/* Open Graph / Facebook */}
				<meta property="og:type" content="profile" />
				<meta property="og:url" content={curriculum.website} />
				<meta property="og:title" content={`${curriculum.name} - ${curriculum.role}`} />
				<meta property="og:description" content={`${curriculum.role} specializing in ${curriculum.role2}. Building scalable web applications and modern solutions.`} />
				<meta property="og:image" content={`${curriculum.website}/Preview.png`} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:site_name" content={`${curriculum.name} Portfolio`} />
				<meta property="og:locale" content={language === 'pt-BR' ? 'pt_BR' : 'en_US'} />
				<meta property="profile:first_name" content={curriculum.name.split(' ')[0]} />
				<meta property="profile:last_name" content={curriculum.name.split(' ').slice(1).join(' ')} />
				<meta property="profile:username" content={curriculum.nick} />

				{/* Twitter Card */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:url" content={curriculum.website} />
				<meta name="twitter:title" content={`${curriculum.name} - ${curriculum.role}`} />
				<meta name="twitter:description" content={`${curriculum.role} specializing in ${curriculum.role2}. Building scalable web applications and modern solutions.`} />
				<meta name="twitter:image" content={`${curriculum.website}/Preview.png`} />
				<meta name="twitter:creator" content={`@${curriculum.nick}`} />

				{/* Additional SEO */}
				<meta name="theme-color" content="#1a365d" />
				<meta name="msapplication-TileColor" content="#1a365d" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />

				{/* Structured Data - JSON-LD for Person */}
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Person",
						"name": curriculum.name,
						"url": curriculum.website,
						"image": curriculum.gravatar,
						"jobTitle": curriculum.role,
						"description": `${curriculum.role} specializing in ${curriculum.role2}`,
						"email": curriculum.email,
						"telephone": curriculum.phone,
						"address": {
							"@type": "PostalAddress",
							"addressCountry": curriculum.location
						},
						"sameAs": [
							curriculum.linkedin,
							curriculum.github,
							curriculum.website
						],
						"knowsAbout": curriculum.skills.map(skill => skill.name),
						"alumniOf": curriculum.educations.map(edu => ({
							"@type": "EducationalOrganization",
							"name": edu.school
						})),
						"worksFor": {
							"@type": "Organization",
							"name": curriculum.companies[0]?.name || "Independent"
						}
					})}
				</script>

				{/* Structured Data - JSON-LD for WebSite */}
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebSite",
						"name": `${curriculum.name} Portfolio`,
						"url": curriculum.website,
						"description": `Professional portfolio and resume of ${curriculum.name}, ${curriculum.role}`,
						"author": {
							"@type": "Person",
							"name": curriculum.name
						},
						"inLanguage": language === 'pt-BR' ? 'pt-BR' : 'en'
					})}
				</script>
			</Helmet>
			<div className="App">
				<Routes>
					<Route path="/" element={
						<>
							<Navbar curriculum={curriculum} strings={strings} />
							<Hero curriculum={curriculum} strings={strings} />
							{/* <Sponsors curriculum={curriculum} /> */}
							<CardScanner />
							<About curriculum={curriculum} strings={strings} />
							<HowItWorks curriculum={curriculum} repos={repos} strings={strings} />
							{/* <Features curriculum={curriculum} /> */}

							<Cta curriculum={curriculum} strings={strings} />
							<Testimonials repos={repos} strings={strings} />
							{/* <Team curriculum={curriculum} /> */}
							{/* <Pricing curriculum={curriculum} /> */}
							{/* <Newsletter curriculum={curriculum} /> */}
							{/* <FAQ curriculum={curriculum} /> */}
							{/* <Services curriculum={curriculum} /> */}
							<div className="relative min-h-screen">
								<Footer curriculum={curriculum} strings={strings} />
								<TravelTunnel />
							</div>
							<ScrollToTop />
							<ConstellationBackground />
						</>
					} />
					<Route path="/Print" element={<Print curriculum={curriculum} strings={strings} />} />
					<Route path="/Preview" element={<Preview />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App;

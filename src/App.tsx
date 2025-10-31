import { About } from "./components/About";
import { Cta } from "./components/Cta";

import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";

import { ScrollToTop } from "./components/ScrollToTop";

import { Testimonials } from "./components/Testimonials";
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

	



    const [repos, setRepos] = useState<Respositories>( {
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
	}, []);

	return (
		
		<Router>
			<Helmet>
				<title>{`${curriculum.name} - ${curriculum.role} ${curriculum.role2}`}</title>
				<meta name="description" content={`$${curriculum.role} ${curriculum.role2}`} />
				<meta name="author" content={curriculum.name} />
				<meta name="keywords" content={`${curriculum.name}, ${curriculum.nick}, ${curriculum.skills.map(skill => skill.name).join(", ")}, SoftExpert, SESuite`} />

				<meta property="og:title" content={`${curriculum.name} - ${curriculum.role} ${curriculum.role2}`} />
				<meta property="og:description" content={`${curriculum.role} ${curriculum.role2}`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={curriculum.website} />
				<meta property="og:image" content="/Preview.png" />
				<link rel="icon" type="image/ico" href="./src/assets/favicon.ico" />
			</Helmet>
			<div className="App">
				<Routes>
					<Route path="/" element={
						<>
							<Navbar curriculum={curriculum} strings={strings} />
							<Hero curriculum={curriculum} strings={strings} />
							{/* <Sponsors curriculum={curriculum} /> */}
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
							<Footer curriculum={curriculum} strings={strings} />
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

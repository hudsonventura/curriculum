import { About } from "./components/About";
import { Cta } from "./components/Cta";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { Pricing } from "./components/Pricing";
import { ScrollToTop } from "./components/ScrollToTop";
import { Services } from "./components/Services";
import { Sponsors } from "./components/Sponsors";
import { Team } from "./components/Team";
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
import { Respositories } from "./components/Repositories";

import ConstellationBackground from './components/ConstellationBackground';
import { Helmet } from 'react-helmet';
import { Preview } from "./components/Preview";


function App() {


	

	const language = navigator.language || navigator.userLanguage;
	const curriculum: Curriculum = language === 'pt-BR' ? curriculumJSONFile : curriculumJSONFileEN;
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
				setRepos(prev => ({ ...prev, github: data }));
			} catch (error) {
				console.error("Error fetching repos:", error);
			}
		};
	
		const fetchFolowers = async () => {
			try {
				const response = await fetch("https://api.github.com/users/hudsonventura/followers");
				const data = await response.json();
				setRepos(prev => ({ ...prev, folower: data }));
			} catch (error) {
				console.error("Error fetching followers:", error);
			}
		};
	
		const fetchNugetLibs = async () => {
			try {
				const response = await fetch("https://azuresearch-usnc.nuget.org/query?q=packageid:softexpertapi");
				const data = await response.json();
				setRepos(prev => ({ ...prev, nugetLibs: data }));
			} catch (error) {
				console.error("Error fetching NuGet libs:", error);
			}
		};
	
		const fetchNugetLibsProfile = async () => {
			try {
				const response = await fetch("https://api-v2v3search-0.nuget.org/query?q=owner:hudsonventura");
				const data = await response.json();
				setRepos(prev => ({ ...prev, nugetProfile: data }));
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
							
							<Cta curriculum={curriculum} />
							<Testimonials curriculum={curriculum} repos={repos} strings={strings} />
							{/* <Team curriculum={curriculum} /> */}
							{/* <Pricing curriculum={curriculum} /> */}
							{/* <Newsletter curriculum={curriculum} /> */}
							{/* <FAQ curriculum={curriculum} /> */}
							{/* <Services curriculum={curriculum} /> */}
							<Footer curriculum={curriculum} strings={strings} />
							<ScrollToTop curriculum={curriculum} strings={strings} /> 
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

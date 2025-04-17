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

import curriculumJSONFile from '../curriculum.json';
import { Curriculum } from './components/Curriculum';
import { useEffect, useState } from "react";
import { Respositories } from "./components/Repositories";

function App() {

	const curriculum: Curriculum = curriculumJSONFile;



    const [repos, setRepos] = useState<Respositories>( {
		github: [],
		folower: [],
		NugetLibs: [],
		nugetProfile: []
	});

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/hudsonventura/repos?sort=pushed&direction=desc");
                const data = await response.json();
				repos.github = data
                setRepos(repos);
            } catch (error) {
                console.error("Error fetching repos:", error);
            }
        };
		
		const fetchFolowers = async () => {
            try {
                const response = await fetch("https://api.github.com/users/hudsonventura/followers");
                const data = await response.json();
				repos.folower = data
                setRepos(repos);
            } catch (error) {
                console.error("Error fetching repos:", error);
            }
        };
		
		const fetchNugetLibs = async () => {
            try {
                const response = await fetch("https://azuresearch-usnc.nuget.org/query?q=packageid:softexpertapi");
                const data = await response.json();
				repos.NugetLibs = data
                setRepos(repos);
            } catch (error) {
                console.error("Error fetching repos:", error);
            }
        };
		
		const fetchNugetLibsProfile = async () => {
            try {
                const response = await fetch("https://api-v2v3search-0.nuget.org/query?q=owner:hudsonventura");
                const data = await response.json();
				repos.nugetProfile = data
                setRepos(repos);
            } catch (error) {
                console.error("Error fetching repos:", error);
            }
        };

        fetchRepos();
        fetchFolowers();
        fetchNugetLibs();
		fetchNugetLibsProfile();
    }, []);

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={
						<>
							<Navbar curriculum={curriculum} />
							<Hero curriculum={curriculum} />
							{/* <Sponsors curriculum={curriculum} /> */}
							<About curriculum={curriculum} />
							<HowItWorks curriculum={curriculum} repos={repos} />
							<Features curriculum={curriculum} />
							<Services curriculum={curriculum} />
							<Cta curriculum={curriculum} />
							<Testimonials curriculum={curriculum} />
							<Team curriculum={curriculum} />
							<Pricing curriculum={curriculum} />
							<Newsletter curriculum={curriculum} />
							<FAQ curriculum={curriculum} />
							<Footer curriculum={curriculum} />
							<ScrollToTop curriculum={curriculum} />
						</>
					} />
					<Route path="/Print" element={<Print curriculum={curriculum} />} /> {/* Página de logs */}
				</Routes>
			</div>
		</Router>
	)
}

export default App;

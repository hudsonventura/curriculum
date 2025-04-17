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

function App() {

	const curriculum: Curriculum = curriculumJSONFile;
	

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={
						<>
							<Navbar curriculum={curriculum} />
							<Hero curriculum={curriculum} />
							<Sponsors curriculum={curriculum} />
							<About curriculum={curriculum} />
							<HowItWorks curriculum={curriculum} />
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

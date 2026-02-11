export type Curriculum = {
	name: string;
	nick: string;
	hello_message: string;
	role: string;
	gravatar: string;
	role2: string;
	email: string;
	phone: string;
	skills: Skills[];
	linkedin: string;
	website: string;
	github: string;
	nuget: string;
	pypi: string;
	companies: Company[];
	educations: Education[];
	education_level: string;
	birth_date: Date;
	location: string;
	english_level: string;
	about: string[];
	duolingo_username?: string;
}

export type Company = {
	name: string;
	subname?: string;
	roles: Roles[];
}

export type Roles = {
	role: string;
	start: Date;
	end: Date | string;
	description: string;
	description_full: string;
}

export type Education = {
	school: string;
	degree: string;
	start: Date;
	end: Date | string;
	description: string;
	description_full: string;
}

export type Skills = {
	name: string;
	icon: string;
	description: string;
}
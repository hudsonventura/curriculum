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
	github: string;
	nuget: string;
	pypi: string;
	companies: Company[];
	educations: Education[];
	education_level: string;
	birth_date: Date;
}

export type Company = {
	name: string;
	roles: Roles[];
}

export type Roles = {
	role: string;
	start: Date;
	end: Date;
	description: string;
}

export type Education = {
	school: string;
	degree: string;
	start: Date;
	end: Date;
}

export type Skills = {
	name: string;
	icon: string;
	description: string;
}
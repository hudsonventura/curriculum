export type Curriculum = {
  name: string;
  role: string;
  role2: string;
  email: string;
  phone: string;
  skills: string[];
  linkedin: string;
  github: string;
  companies: Company[];
  educations: Education[];
}

type Company = {
  name: string;
  roles: Roles[];
}

type Roles = {
    role: string;
    start: Date;
    end: Date;
    description: string;
}

type Education = {
    school: string;
    degree: string;
    start: Date;
    end: Date;
}
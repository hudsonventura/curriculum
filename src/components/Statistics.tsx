import { Curriculum } from "./Curriculum";
import { DuolingoStats } from "./DuolingoStats";
import StringsHandler from "./StringsHandler";

export const Statistics = ({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) => {




    return (
        <>
            <section id="statistics">
                <div className="grid grid-cols-4 lg:grid-cols-4 gap-8">

                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl sm:text-2xl font-bold ">🥳 {(strings as any)[9]}</h2>
                        <p className="text-xl text-muted-foreground"><s>{new Date().getFullYear()} - {new Date(curriculum.birth_date).getFullYear()} = </s> {new Date().getFullYear() - new Date(curriculum.birth_date).getFullYear()} {(strings as any)[10]}</p>
                    </div>

                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl sm:text-2xl font-bold ">🎓 {(strings as any)[11]}</h2>
                        <p className="text-xl text-muted-foreground">{curriculum.education_level}</p>
                    </div>

                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl sm:text-2xl font-bold ">📍 {(strings as any)[12]}</h2>
                        <p className="text-xl text-muted-foreground"> {curriculum.location}</p>
                    </div>

                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl sm:text-2xl font-bold flex items-center justify-center gap-2">
                            <img src="./american_flag.svg" className="w-6 h-6" alt="US" />
                            {(strings as any)[36]}
                        </h2>
                        <p className="text-xl text-muted-foreground"> {curriculum.english_level}</p>
                        <p className="text-muted-foreground text-sm"><a
                            href={`https://www.duolingo.com/profile/hudsonventura`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            View Duolingo Profile →
                        </a></p>
                    </div>
                </div>
            </section>

            {/* <section id="statistics" className="mt-10">
                <div className="grid lg:grid-cols-1">
                    <DuolingoStats
                        username={(curriculum as any).duolingo_username}
                    />
                </div>
            </section> */}
        </>
    );
};

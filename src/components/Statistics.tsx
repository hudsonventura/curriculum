import { Curriculum } from "./Curriculum";
import StringsHandler from "./StringsHandler";

export const Statistics = ({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) => {




    return (
        <section id="statistics">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="space-y-2 text-center">
                    <h2 className="text-2xl sm:text-2xl font-bold ">{strings[9]}</h2>
                    <p className="text-xl text-muted-foreground"><s>{new Date().getFullYear()} - {new Date(curriculum.birth_date).getFullYear()} = </s> {new Date().getFullYear() - new Date(curriculum.birth_date).getFullYear()} {strings[10]}</p>
                </div>

                <div className="space-y-2 text-center">
                    <h2 className="text-2xl sm:text-2xl font-bold ">{strings[11]}</h2>
                    <p className="text-xl text-muted-foreground">{curriculum.education_level}</p>
                </div>

                <div className="space-y-2 text-center">
                    <h2 className="text-2xl sm:text-2xl font-bold ">{strings[12]}</h2>
                    <p className="text-xl text-muted-foreground">{curriculum.location}</p>
                </div>

            </div>
        </section>
    );
};

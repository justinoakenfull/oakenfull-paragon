import isValidColour from "../../utils/isValidColour";

type SkillPaneProps = {
    skillName: string;
    skillLevel: string;
    listOfSubSkills: string[];
    effectColour: string;
};

export function SkillPane({ skillName, skillLevel, listOfSubSkills, effectColour }: SkillPaneProps) {

    console.log(`The colour is: ${effectColour}, and is valid: ${isValidColour(effectColour)}`);
    if (!isValidColour(effectColour)) {
        console.error(`Invalid effect colour: ${effectColour}`);
        effectColour = 'maize'; // Fallback to a default colour
        console.warn(`Using default colour: ${effectColour}`);
    }

    return (
        <div className={`skill-pane-background border-${effectColour} hover:border-${effectColour} hover:shadow-glow-${effectColour}`}>
            <div className="skill-pane">

            </div>
        </div>
    );
}
import React from 'react';
import '../../styles/hero/hero.css';
import { Button } from '../Common/Button';
import { SkillPane } from './SkillPane';

const developer = 'Justin Oakenfull';

export function Hero() {
    return (
        <div className="hero-container">
            <div className="hero">
                <div className='hero-text mt-40'>{developer.toUpperCase()}</div>
                <div>Welcome to the Neural Command Interface</div>
                <Button className='btn hero-button hover:shadow-glow-maize-inset' buttonText='LAUNCH PROTOCOL' />
            </div>

            <SkillPane skillLevel='10' skillName='JavaScript' listOfSubSkills={['ES6', 'React', 'Node.js']} effectColour='blue' />
        </div>
    );
}

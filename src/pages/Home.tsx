import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <ModeToggle />
            <a href="/extension">Go to MindSweep</a>
        </div>
    );
};

export default Home;
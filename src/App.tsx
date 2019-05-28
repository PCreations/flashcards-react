import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>Flashcard</h1>
      <button data-testid="signInWithGithub">Sign in with Github</button>
    </div>
  );
};

export default App;

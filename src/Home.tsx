import React from 'react';

type HomeProps = {
  onSignInClicked: () => void;
};

export const Home: React.FC<HomeProps> = ({ onSignInClicked }) => (
  <div>
    <h1>Flashcards</h1>
    <button aria-label="Sign in with Github" onClick={onSignInClicked}>
      Sign in with Github
    </button>
  </div>
);

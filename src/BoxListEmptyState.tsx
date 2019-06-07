import React from 'react';
import { AddBoxButton } from './AddBoxButton';

export const BoxListEmptyState: React.FC = () => (
  <div>
    <h1>No flashcards box yet</h1>
    <h2>Create a new box and it will show up here.</h2>
    <AddBoxButton />
  </div>
);

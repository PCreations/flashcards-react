import { render } from 'react-testing-library';

export const expectAButtonToAddNewBoxToBeVisible = (
  getByLabelText: ReturnType<typeof render>['getByLabelText'],
) => expect(getByLabelText(/create a new box/i)).toBeInTheDocument();

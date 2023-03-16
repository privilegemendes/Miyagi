import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from './Toast';

describe('Toast', () => {
	it('renders the toast message', () => {
		render(<Toast variant="notice">This is a toast message </Toast>);
		expect(screen.getByText('This is a toast message')).toBeInTheDocument();
	});

	it('renders the toast with the correct variant', () => {
		render(<Toast variant="notice">This is a notice message </Toast>);
		expect(screen.getByTestId('toast-container')).toHaveClass('notice');

		render(<Toast variant="error">This is a error message </Toast>);
		expect(screen.getByTestId('toast-container')).toHaveClass('error');

		render(<Toast variant="warning">This is a warning message </Toast>);
		expect(screen.getByTestId('toast-container')).toHaveClass('warning');

		render(<Toast variant="success">This is a success message </Toast>);
		expect(screen.getByTestId('toast-container')).toHaveClass('success');
	});


	it('calls the onClose function when the close button is clicked', () => {
		const onClose = jest.fn();
		render(<Toast variant="notice" onClose={onClose}>Close me</Toast>);
		userEvent.click(screen.getByLabelText('Close'));
		expect(onClose).toHaveBeenCalled();
	});
});

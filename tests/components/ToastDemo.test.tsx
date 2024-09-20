
import { render, screen, waitFor } from '@testing-library/react';


import ToastDemo from '../../src/components/ToastDemo';
import { Toaster } from 'react-hot-toast';
import userEvent from '@testing-library/user-event';


describe('ToastDemo', () => {
    it('should render tags', async () => {
        render(
            <>
                <ToastDemo />
                <Toaster />
            </>)

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument()

        const user = userEvent.setup()
        await user.click(button);

        const toast = await screen.findByText('Success')
        expect(toast).toBeInTheDocument()



    })
})


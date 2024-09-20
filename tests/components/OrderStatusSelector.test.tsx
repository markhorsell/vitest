
import { render, screen } from '@testing-library/react';
import { Theme } from "@radix-ui/themes";



import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import userEvent from '@testing-library/user-event';


describe('OrderStatusSelector', () => {
    it('should be new by default ', async () => {
        render(<Theme>
            <OrderStatusSelector onChange={value => console.log(value)} />
        </Theme>)
        const button = screen.getByRole('combobox');
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('New');


    })
    it('should contain these options ', async () => {
        render(<Theme>
            <OrderStatusSelector onChange={value => console.log(value)} />
        </Theme>)
        const button = screen.getByRole('combobox');
        const user = userEvent.setup()
        await user.click(button);
        const options = await screen.findAllByRole('option')
       const labels=options.map((o=>{
        
        return o.textContent
       }))
       expect(labels).toEqual(['New','Processed','Fulfilled'])


    })
})


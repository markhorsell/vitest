import { render, screen } from "@testing-library/react";

import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe('TermsAndConditions', () => {

    const renderComponent = () => {
        render(<TermsAndConditions />);
        return {
            heading: screen.getByRole('heading'),
            checkbox: screen.getByRole('checkbox'),
            button: screen.getByRole('button', { name: /submit/i })

        }
    }

    it('should render with correct text', () => {
      
        const { heading, checkbox, button } = renderComponent();
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('Terms & Conditions')
  
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked()
 
        expect(button).toBeInTheDocument();
        expect(button).not.toBeEnabled()

    })
    it('should enable the button when the checkbox is checked', async () => {
        const { checkbox, button } = renderComponent();

        const user = userEvent.setup()
        await user.click(checkbox);

        expect(button).toBeEnabled()

    })
})


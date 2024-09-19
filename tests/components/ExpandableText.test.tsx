import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import ExpandableText from "../../src/components/ExpandableText";

describe('Expandable Text', () => {
    const limit = 255;
    const longText = 'a'.repeat(limit + 1)
    const truncatedText = longText.substring(0, limit) + '...';

    it('should render btn if text exceeds 255 chars with show more if not clicked', () => {

        render(<ExpandableText text={longText} />)

        const button = screen.getByRole('button', { name: /Show More/i })
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled()

    })
    it('should render btn if text exceeds 255 chars with show less if clicked', async () => {

        render(<ExpandableText text={longText} />)
        const button = screen.getByRole('button', { name: /Show More/ })
        const user = userEvent.setup()
        await user.click(button);
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled()
        expect(button).toHaveTextContent(/show less/i)

    })

    it('should expand text if show more is clicked', async () => {

        render(<ExpandableText text={longText} />)
        const button = screen.getByRole('button', { name: /Show More/ })
        const user = userEvent.setup()
        await user.click(button);
        expect(screen.getByText(longText)).toBeInTheDocument();

    })
    it('should trunc text if show less is clicked', async () => {

        render(<ExpandableText text={longText} />)
        const showMorebutton = screen.getByRole('button', { name: /Show More/ })
        const user = userEvent.setup()
        await user.click(showMorebutton);
        const showLessbutton = screen.getByRole('button', { name: /Show Less/ })
        await user.click(showLessbutton);
        expect(screen.getByText(truncatedText)).toBeInTheDocument();

    })
    it('should truncate text if it exceeds 255 chars ', () => {

        render(<ExpandableText text={longText} />)


        expect(screen.getByText(truncatedText)).toBeInTheDocument();


    })
    it('should NOT render btn if text length is under 255 chars', () => {
        const text = 'a'.repeat(254)
        render(<ExpandableText text={text} />)
        const button = screen.queryByRole('button', { name: /Show more/ });
        expect(button).not.toBeInTheDocument();
        expect(screen.getByText(text)).toBeInTheDocument();
    })

})


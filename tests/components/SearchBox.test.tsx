import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import SearchBox from "../../src/components/SearchBox";

describe('SearchBox', () => {

    const renderSearchBox = () => {
        const onChange = vi.fn();
        render(<SearchBox onChange={onChange} />)
        return {
            input: screen.getByPlaceholderText('Search...'),
            user: userEvent.setup(),
            onChange,

        }
    }

    it('should render an input field for searching', async () => {

        const { input } = renderSearchBox()

        expect(input).toBeInTheDocument();


    })
    it('should call on change callback when enter is pressed', async () => {

        const { onChange, input, user } = renderSearchBox()

        const searchTerm = "searchTerm"
        expect(input).toBeInTheDocument();
        await user.type(input, `${searchTerm}{enter}`);
        expect(onChange).toHaveBeenCalledWith(searchTerm)
    })
    it('should NOT call on change if input is empty', async () => {

        const { onChange, input, user } = renderSearchBox()
        await user.type(input, "{enter}");

        expect(onChange).not.toHaveBeenCalled()
    })

})


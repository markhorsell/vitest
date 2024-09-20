
import { render, screen, waitFor } from '@testing-library/react';

import TagList from '../../src/components/TagList';


describe('TagList', () => {
    it('should render tags' , async ()=>{
        render(<TagList/>)
        //default 1 second
        // await waitFor(()=>{
        //     const listItems =screen.getAllByRole('listitem');
        //     expect(listItems.length>0)
        // })
        const listItems =await screen.findAllByRole('listitem');
        expect(listItems.length).toBeGreaterThan(0)
       
    })
})


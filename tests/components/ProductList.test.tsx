import { render, screen } from '@testing-library/react'
import ProductList from '../../src/components/ProductList'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('ProductList',()=>{
    it('should render list of products',async ()=>{
        render(<ProductList/>)
   
        const items =await screen.findAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);

    })
    it('should render no peoducts available',async ()=>{

        server.use(http.get('/products',()=> HttpResponse.json([])))
        render(<ProductList/>)
   
        const msg =await screen.findByText('No products available.');
        expect(msg).toBeInTheDocument()

    })
})
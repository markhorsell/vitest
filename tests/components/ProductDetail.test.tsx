import { render, screen } from '@testing-library/react'
import ProductList from '../../src/components/ProductList'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'
import ProductDetail from '../../src/components/ProductDetail'
import { products } from '../mocks/data'

describe('ProductDetail', () => {
    it('should render product 1 detail', async () => {
        render(<ProductDetail productId={1} />)

        const product1 = await screen.findByText(new RegExp(products[0].name));
        const product1Price = await screen.findByText(new RegExp(products[0].price.toString()));
        expect(product1).toBeInTheDocument()
        expect(product1Price).toBeInTheDocument()

    })
    it('should render product 2 detail', async () => {
        render(<ProductDetail productId={2} />)

        const product2 = await screen.findByText(/Product 2/i);
        expect(product2).toBeInTheDocument()

    })
    it('should render msg if prod not found', async () => {
        server.use(http.get('products/:1', () => HttpResponse.json(null)))
        render(<ProductDetail productId={1} />)
        const msg = await screen.findByText(/not found/i);
        expect(msg).toBeInTheDocument()

    })
    it('should render an error for invalid id', async () => {
    
        render(<ProductDetail productId={0} />)
        const msg = await screen.findByText(/invalid/i);
        expect(msg).toBeInTheDocument()

    })
})


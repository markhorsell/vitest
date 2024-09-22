import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import ProductList from '../../src/components/ProductList'
import { server } from '../mocks/server'
import { delay, http, HttpResponse } from 'msw'

import { db } from '../mocks/db'

describe('ProductList', () => {

    let productIds: number[] = [];
    beforeAll(() => {
        [1, 2, 3].forEach(() => {
            const product = db.product.create()
            productIds.push(product.id)
        })
    })
    afterAll(() => {

        return db.product.deleteMany({ where: { id: { in: productIds } } })

    })


    it('should render list of products', async () => {
        render(<ProductList />)

        const items = await screen.findAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);

    })
    it('should render no peoducts available', async () => {

        server.use(http.get('/products', () => HttpResponse.json([])))
        render(<ProductList />)

        const msg = await screen.findByText('No products available.');
        expect(msg).toBeInTheDocument()

    })
    it('should render error msg if error', async () => {

        server.use(http.get('/products', () => HttpResponse.error()))
        render(<ProductList />)

        const errmsg = await screen.findByText(/error/i);
        expect(errmsg).toBeInTheDocument()

    })
    it('should render a loading indicator when fetching', async () => {

        server.use(http.get('/products', async () => {
            await delay();
            HttpResponse.json([])
        }))
        render(<ProductList />)
        const loadingMsg = await screen.findByText(/loading/i);

        expect(loadingMsg).toBeInTheDocument()

    })
    it('should remove loading indicator after data is loaded', async () => {
        render(<ProductList />)
        await waitForElementToBeRemoved(() => {
            return screen.queryByText(/loading/i);
        })
    })
    it('should remove loading indicator if data fetching fails', async () => {
        server.use(http.get('/products', () => HttpResponse.error()))
        render(<ProductList />)
        await waitForElementToBeRemoved(() => {
            return screen.queryByText(/loading/i);
        })
    })
})
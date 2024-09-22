import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import ProductList from '../../src/components/ProductList'
import { server } from '../mocks/server'
import { delay, http, HttpResponse } from 'msw'
import ProductDetail from '../../src/components/ProductDetail'
import { db } from '../mocks/db'
//import { products } from '../mocks/data'

describe('ProductDetail', () => {
    let productId:number;
    beforeAll(()=>{
     
            const product = db.product.create()
            productId=product.id;
    
    })
    afterAll(()=>{
      
            return db.product.delete({where:{id:{equals:productId}}})
    
    })
    it('should render product details', async () => {
        render(<ProductDetail productId={productId} />)

       const product=db.product.findFirst({where:{id:{equals:productId}}});

        const product1 = await screen.findByText(new RegExp(product!.name));
        const product1Price = await screen.findByText(new RegExp(product!.price.toString()));
        expect(product1).toBeInTheDocument()
        expect(product1Price).toBeInTheDocument()

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
    it('should render an error if data fetch fails', async () => {
        server.use(http.get('products/:1', () => HttpResponse.error()))
        render(<ProductDetail productId={0} />)
        const errmsg = await screen.findByText(/error/i);
        expect(errmsg).toBeInTheDocument()

    })
    it('should render a loading indicator when fetching', async () => {

        server.use(http.get('/products/:1', async () => {
            await delay();
            HttpResponse.json([])
        }))
        render(<ProductDetail productId={1}/>)
        const loadingMsg = await screen.findByText(/loading/i);

        expect(loadingMsg).toBeInTheDocument()

    })
    it('should remove loading indicator after data is loaded', async () => {
        render(<ProductDetail productId={1}/>)
        await waitForElementToBeRemoved(() => {
            return screen.queryByText(/loading/i);
        })
    })
    it('should remove loading indicator if data fetching fails', async () => {
        server.use(http.get('/products/:1', () => HttpResponse.error()))
        render(<ProductDetail productId={1}/>)
        await waitForElementToBeRemoved(() => {
            return screen.queryByText(/loading/i);
        })
    })
})


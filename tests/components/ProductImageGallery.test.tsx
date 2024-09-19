import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery"

describe('ProductImageGallery', () => {
    it('should render nothing if array is empty', () => {
        const imageUrls: string[] = [];
        const { container } = render(<ProductImageGallery imageUrls={imageUrls} />)
        expect(container).toBeEmptyDOMElement()


    })
})

describe('ProductImageGallery', () => {
    it('should render images with correct src attr', () => {
        const imageUrls: string[] = ["url1", "url2"];
        render(<ProductImageGallery imageUrls={imageUrls} />)
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(2);
        imageUrls.forEach((url,index)=>{
            expect(images[index]).toHaveAttribute('src', url)
        })
       
    })
})
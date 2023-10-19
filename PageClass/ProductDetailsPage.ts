import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NamePrice, QuantitySelected } from "./ObjectInterface";

export class ProductDetailsPage extends BasePage{

    private readonly productNameOnDetailsPage:Locator
    private readonly productPriceOnDetailsPage:Locator
    private readonly addToCartButton:Locator
    private readonly buyNowButton:Locator
    private readonly quantityDropDown:Locator
    private readonly cartLink:Locator
    private readonly productCountInCartIcon:Locator

    constructor(page: Page){

        super(page)

        this.page = page

        this.productNameOnDetailsPage = page.locator("//span[@id='productTitle']")

        this.productPriceOnDetailsPage = page.locator("//div[@id='corePriceDisplay_desktop_feature_div']//span[contains(@class,'a-price-whole')]")

        this.addToCartButton = page.locator('id=add-to-cart-button')

        this.buyNowButton = page.locator('id=buy-now-button')

        this.quantityDropDown = page.locator('id=quantity')

        this.cartLink = page.locator('id=nav-cart-count-container')

        this.productCountInCartIcon = page.locator("(//div[@id='nav-cart-count-container']//span)[1]")
        
    }

    async getProductDetailsOnDetailsPage():Promise<NamePrice>{

        const productPrice:string = await this.productPriceOnDetailsPage.textContent() || ''

        const productName:string = await this.productNameOnDetailsPage.textContent() || ''

        const productDetails:NamePrice = {

            price:productPrice,
            name: productName
        }

        return productDetails;
    }

    async addProductToCard():Promise<object>{

        const quantitySelected:string = await this.quantityDropDown.getAttribute('value') || ''

        const countInCardIcon:string = await this.productCountInCartIcon.textContent() || ''

        const productQuantitySelected:QuantitySelected = {

            totalQuantity:quantitySelected,
            cartIconCount:countInCardIcon
        }

        return productQuantitySelected;
}
}
import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto'

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({ 
            message: 'Product Succesfully created',
            product
        });
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({ 
            message: 'Products',
            products
        });
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException('Product Does not exists');
        return res.status(HttpStatus.OK).json({ 
            message: 'Product',
            product
        });
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if(!productDeleted) throw new NotFoundException('Product Does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Succesfully',
            productDeleted
        })
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const productUpdated = await this.productService.updateProduct(productID, createProductDTO);
        if(!productUpdated) throw new NotFoundException('Product Does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Succesfully',
            productUpdated
        })
    }
}

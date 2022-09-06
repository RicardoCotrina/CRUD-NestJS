import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    ProductModule, 
    MongooseModule.forRoot(
      'mongodb://localhost/product-nest-tutorial?directConnection=true'
    ), CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

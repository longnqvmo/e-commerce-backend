import { ApiProperty } from '@nestjs/swagger';

interface ProductCategoryInterface {
  productId: string;
  categoryId: string;
}
export class AddCategoryToProductDTO {
  @ApiProperty({
    description: 'Example',
    example: [
      {
        productId: 'c44a44a2-bdf7-4ea8-aa62-f585047c3de2',
        categoryId: '6037b876-0d22-45af-bd02-958a9d269501',
      },
      {
        productId: 'c44a44a2-bdf7-4ea8-aa62-f585047c3de2',
        categoryId: '094fec01-aae8-4e1b-9c49-a3bdf3faf8db',
      },
    ],
  })
  productCategory: ProductCategoryInterface;
}

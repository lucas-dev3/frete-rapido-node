import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class Address {
  @ApiProperty()
  zipcode: string;
}

class Recipient {
  @ApiProperty()
  address: Address;
}

class Volume {
  @ApiProperty()
  category: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  unitaryWeight: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  length: number;
}

export class CreateQuoteDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => Address) // Garante que a validação seja aplicada em Address
  recipient: Recipient;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Address) // Garante que a validação seja aplicada em Address
  volumes: Volume[];
}

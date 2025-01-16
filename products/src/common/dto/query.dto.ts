import { IsNumberString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty({
    description: 'Max number of items per page',
    example: 10,
  })
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly limit?: number;

  @ApiProperty({
    description: 'Number of items to skip',
    example: 0,
  })
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  readonly offset?: number;
}

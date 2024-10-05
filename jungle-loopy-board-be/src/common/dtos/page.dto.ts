
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional } from "class-validator";

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
export class PageMetaDto {
  readonly total: number;
  readonly page: number;
  readonly take: number;
  readonly last_page: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page <= 0 ? this.page = 1 : pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.total = total;
    this.last_page = Math.ceil(this.total / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.last_page;
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total: number;
}

export class PageOptionsDto {

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly take?: number = 3;

  get skip(): number {
    return this.page <= 0 ? this.page = 0 : (this.page - 1) * this.take;
  }
}

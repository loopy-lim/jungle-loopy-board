import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos/page.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject("POST_REPOSITORY")
    private postRepository: Repository<Post>,
  ) { }
  async getPaginate(pageOptionsDto: PageOptionsDto) {
    const [posts, total] = await this.postRepository.findAndCount({
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });
    const last_page = pageMetaDto.last_page;

    if (pageOptionsDto.page > last_page) {
      throw new Error('Page not found');
    }

    return new PageDto(posts, pageMetaDto);
  }
}

import { EntityRepository } from 'typeorm';

import { PER_PAGE } from "../../../../infrastructure/constanst";
import BaseRepository from "../../../../infrastructure/Repositories";
import Thumbnails from '../Entities/Thumbnails';


@EntityRepository(Thumbnails)
class ThumbnailsRepository extends BaseRepository<Thumbnails> {

  constructor() {
    super(Thumbnails, 'thumbnails');
  }

  public async getAll(options): Promise<object> {
    const {page, keyword} = options;
    const perPage = PER_PAGE;
    const start = perPage * (page - 1);
    const connection = await this.db.getConnection();
    let res = connection
      .getCustomRepository(ThumbnailsRepository)
      .createQueryBuilder("thumbnails")
      .where("deleted_at IS NULL");

    if (keyword !== '') {
      res = res.where("name ilike :keyword", {keyword: '%' + keyword + '%'})
        .orWhere('phone ilike :keyword', {keyword: '%' + keyword + '%'});
    }

    res = res
      .orderBy("id", "DESC")
      .andWhere('deleted_at IS NULL')
      .skip(start)
      .take(perPage)
      .getManyAndCount();

    return res;
  }
}

export default ThumbnailsRepository;

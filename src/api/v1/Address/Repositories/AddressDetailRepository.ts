import { EntityRepository } from 'typeorm';

import BaseRepository from "../../../../infrastructure/Repositories";
import AddressDetail from '../Entities/AddressDetail';

@EntityRepository(AddressDetail)
class AddressDetailRepository extends BaseRepository<AddressDetail> {

  constructor() {
    super(AddressDetail, 'address_details');
  }
}

export default AddressDetailRepository;

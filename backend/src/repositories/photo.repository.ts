import {DefaultCrudRepository} from '@loopback/repository';
import {Photo, PhotoRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PhotoRepository extends DefaultCrudRepository<
  Photo,
  typeof Photo.prototype.id,
  PhotoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Photo, dataSource);
  }
}

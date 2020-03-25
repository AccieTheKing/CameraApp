import { Entity, model, property } from '@loopback/repository';

@model()
export class Photo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  receiver: string

  @property({
    type: 'string',
    required: true,
  })
  sender: string

  @property({
    type: 'string',
    required: true,
  })
  data: string


  constructor(data?: Partial<Photo>) {
    super(data);
  }
}

export interface PhotoRelations {
  // describe navigational properties here
}

export type PhotoWithRelations = Photo & PhotoRelations;

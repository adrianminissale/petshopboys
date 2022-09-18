export interface PetsStateModel {
  pets: Pet[];
  status: string;
};

export interface Pet {
  id: number;
  category: BasicObject;
  name: string;
  photoUrls: string[],
  tags: BasicObject[],
  status: string;
}

interface BasicObject {
  id: number;
  name: string;
}
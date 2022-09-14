import { Pet } from 'src/app/state';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private httpClient: HttpClient) { }

  public createPet(pet: Pet){

    const tags = pet.tags.map((tag, index) => {
      return {id: index, name: tag}
    })

    const body = {
      id: Date.now(),
      category: {
        id: 0,
        name: pet.category
      },
      photoUrls: [
        pet.photoUrls
      ],
      name: pet.name,
      tags: tags,
      status: pet.status
    }

    return this.httpClient.post(`https://petstore.swagger.io/v2/pet`, body);
  }
}

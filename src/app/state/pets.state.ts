import { Injectable } from "@angular/core";
import { State, Action, Selector, StateContext } from "@ngxs/store";

import { Pets } from "./pets.actions";
import { PetsStateModel } from "./pets.model";

@State<PetsStateModel>({
  name: "pets",
  defaults: {
    pets: [],
    status: '',
  },
})
@Injectable()
export class PetsState {

  @Action(Pets.Search)
  petsSearch(
    ctx: StateContext<PetsStateModel>,
    actions: Pets.Search
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      pets: actions.payload,
    });
  }

  @Action(Pets.Status)
  petsStatus(
    ctx: StateContext<PetsStateModel>,
    actions: Pets.Status
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      status: actions.payload,
    });
  }

  @Selector()
  static pets(state: PetsStateModel) {
    return state.pets;
  }

  @Selector()
  static status(state: PetsStateModel) {
    return state.status;
  }
}
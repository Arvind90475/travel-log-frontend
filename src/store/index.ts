import { SnapshotIn, types } from "mobx-state-tree";

const Ui = types
  .model({
    isLoading: false,
  })
  .actions((self) => ({
    toggleLoading() {
      self.isLoading = !self.isLoading;
    },
  }));

export const uiStore = Ui.create();
export interface IUi extends SnapshotIn<typeof Ui> {}

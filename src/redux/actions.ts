import { createAction as RACreateAction } from 'redux-actions';

interface IState {
  loading: boolean | object | any;
  success: string | boolean | object | any;
  error: string | boolean | object | any;
  reset: string | boolean | object | any;
}
// TODO properly docuemnt this class, very important
export default class ActionState {
  public namespace;

  public create: IState;
  public read: IState;
  public readOne: IState;
  public patch: IState;
  public update: IState;
  public delete: IState;

  // TODO, add a readone and a patch method

  /**
   * @param {*} namespace, action namespace
   * intialize the class with  a proper entitiy name
   */
  constructor(namespace) {
    this.namespace = namespace;

    this.create = {
      loading: `${this.namespace}/CREATE/LOADING`,
      success: `${this.namespace}/CREATE/SUCCESS`,
      error: `${this.namespace}/CREATE/ERROR`,
      reset: `${this.namespace}/CREATE/RESET`,
    };

    this.read = {
      loading: `${this.namespace}/READ/LOADING`,
      success: `${this.namespace}/READ/SUCCESS`,
      error: `${this.namespace}/READ/ERROR`,
      reset: `${this.namespace}/READ/RESET`,
    };

    this.readOne = {
      loading: `${this.namespace}/READONE/LOADING`,
      success: `${this.namespace}/READONE/SUCCESS`,
      error: `${this.namespace}/READONE/ERROR`,
      reset: `${this.namespace}/READONE/RESET`,
    };

    this.patch = {
      loading: `${this.namespace}/PATCH/LOADING`,
      success: `${this.namespace}/PATCH/SUCCESS`,
      error: `${this.namespace}/PATCH/ERROR`,
      reset: `${this.namespace}/PATCH/RESET`,
    };

    this.update = {
      loading: `${this.namespace}/UPDATE/LOADING`,
      success: `${this.namespace}/UPDATE/SUCCESS`,
      error: `${this.namespace}/UPDATE/ERROR`,
      reset: `${this.namespace}/UPDATE/RESET`,
    };

    this.delete = {
      loading: `${this.namespace}/DELETE/LOADING`,
      success: `${this.namespace}/DELETE/SUCCESS`,
      error: `${this.namespace}/DELETE/ERROR`,
      reset: `${this.namespace}/DELETE/RESET`,
    };
  }

  public createAction(payload) {
    return {
      loading: RACreateAction(this.create.loading)(payload),
      success: RACreateAction(this.create.success)(payload),
      error: RACreateAction(this.create.error)(payload),
      reset: RACreateAction(this.create.reset)(payload),
    }
  }

  public readAction(payload) {
    return {
      loading: RACreateAction(this.read.loading)(payload),
      success: RACreateAction(this.read.success)(payload),
      error: RACreateAction(this.read.error)(payload),
      reset: RACreateAction(this.read.reset)(payload),
    }
  }

  public readOneAction(payload) {
    return {
      loading: RACreateAction(this.readOne.loading)(payload),
      success: RACreateAction(this.readOne.success)(payload),
      error: RACreateAction(this.readOne.error)(payload),
      reset: RACreateAction(this.readOne.reset)(payload),
    }
  }

  public patchAction(payload) {
    return {
      loading: RACreateAction(this.patch.loading)(payload),
      success: RACreateAction(this.patch.success)(payload),
      error: RACreateAction(this.patch.error)(payload),
      reset: RACreateAction(this.patch.reset)(payload),
    }
  }

  public updateAction(payload) {
    return {
      loading: RACreateAction(this.update.loading)(payload),
      success: RACreateAction(this.update.success)(payload),
      error: RACreateAction(this.update.error)(payload),
      reset: RACreateAction(this.update.reset)(payload),
    }
  }

  public deleteAction(payload) {
    return {
      loading: RACreateAction(this.delete.loading)(payload),
      success: RACreateAction(this.delete.success)(payload),
      error: RACreateAction(this.delete.error)(payload),
      reset: RACreateAction(this.delete.reset)(payload),
    }
  }
}

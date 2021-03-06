import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule
} from "vuex-module-decorators";
import { IEdit, IGirl, IGirl2, IStatus, IUpload } from "@/interface/girl";
import { deleteGirl, editGirl, fetchGirls, postGirl } from "@/util/fetchGirls";

import { filter } from "@/util/ObjectFilter";

@Module({
  name: "girls",
  stateFactory: true,
  namespaced: true
})
export default class GirlsModule extends VuexModule {
  girls: IGirl | IGirl2 = {
    name: "",
    facebook: "",
    instrgram: "",
    description: "",
    age: 0,
    url: "",
    date: ""
  };

  statusAPI: IStatus = {
    status: 0,
    statusText: ""
  };

  @Mutation
  async insert(status: IStatus) {
    this.statusAPI = status;
  }

  @Mutation
  edit(status: IStatus) {
    this.statusAPI = status;
  }

  @Mutation
  get(obj: IGirl) {
    this.girls = obj;
  }

  @Mutation
  remove(obj: IGirl) {
    this.girls = filter(
      this.girls,
      (item: IGirl) => item.facebook !== obj.facebook
    );
  }

  @Action
  async editGirl({ id, girl }: IEdit) {
    this.context.commit("edit", await editGirl(`girl/${id}.json`, girl));
  }

  @Action
  async insertGirl(girl: IGirl) {
    console.log(`girl`, girl);

    this.context.commit("insert", await postGirl(`girl.json`, girl));
  }

  @Action
  async deleteGirl(id: string) {
    let obj = await fetchGirls(id);
    await deleteGirl(id);
    this.context.commit("remove", obj);
  }

  @Action
  async deleteImagesProfile({ storage, url }: IUpload) {
    let image = storage.refFromURL(url);
    await image
      .delete()
      .then(() => {
        console.log(`image deleted`);
      })
      .catch((error: any) => {
        console.log(`error`, error);
      });
  }

  @Action
  async uploadImageProfile({ storage, file, nameOwner }: IUpload) {
    if (!file.type.match("image.*")) {
      alert("Please upload an image.");
      return;
    }

    const metadata = {
      contentType: file.type
    };

    const imageRef = storage.ref(`${nameOwner}`);
    const uploadTask = await imageRef
      .put(file, metadata)
      .then((snapshot: any) => {
        // Once the image is uploaded, obtain the download URL, which
        // is the publicly accessible URL of the image.
        return snapshot.ref.getDownloadURL().then((url: string) => {
          return url;
        });
      })
      .catch((error: any) => {
        console.error("Error uploading image", error);
      });

    console.log(`uploadTask`, uploadTask);

    return uploadTask;
  }

  @Action
  OnReset(form: IGirl) {
    form.name = "";
    form.facebook = "";
    form.instrgram = "";
    form.description = "";
    form.age = 0;
    form.url = "";
    return form;
  }

  @Action
  async getGirls() {
    //return await fetchGirls(`girl.json`);
    this.context.commit("get", await fetchGirls(`girl.json`));
  }

  @Action
  resetStatusAPI() {
    this.context.commit("resetStatus");
  }
}

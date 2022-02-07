  //プロジェクトの実行、終了を定義する型を定義。
  export enum ProjectStatus {
    Active,
    Finished,
  }
  //オブジェクトの型を定義するクラスを作成
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public manday: number,
      public status: ProjectStatus
    ) {}
  }
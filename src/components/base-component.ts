//ProjectList,ProjectInputクラスで冗長になっているプログラムを一つにまとめるクラスの作成。
//Componentクラス、画面のUIのためのクラスとして一般的につけられる名称。
//このクラスを継承する際に型を指定することができるようにジェネリックを定義する。
//abstract化するとインスタンス化できなくなる。
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  //HTMLのTemplate要素を取得するプロパティ。
  templateElement: HTMLTemplateElement;
  hostElement: T; //継承の際に具体的な型定義が必要。
  element: U; //継承の際に具体的な型定義が必要。

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean, //プロジェクトの挿入位置を指定。
    newElementId?: string
  ) {
    //templateElement ID#project-list要素を取得。
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    //hestElement ID#app要素を取得。
    this.hostElement = document.getElementById(hostElementId)! as T;
    //template要素をHTMLにインポート
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  abstract configure(): void;
  abstract renderContent(): void;

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

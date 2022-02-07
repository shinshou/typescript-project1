import { Component } from "./base-component";
import { Validatable,validate } from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

//フォームの表示と入力値の取得のクラス。
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  //プロパティ...InputElementにHTMLのInput要素であると指定。
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  //HTMLから要素を参照するプロパティの追加。
  constructor() {
    super("project-input", "app", true, "user-input");

    //HTMLのForm要素内の#titleを取得
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    //HTMLのForm要素内の#descriptionを取得
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    //HTMLのForm要素内の#mandayを取得
    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    //configureメソッドの実行。
    this.configure();
  }

  //formのイベントリスナーメソッド
  configure() {
    //form要素がsubmitされたときのイベントを定義
    this.element.addEventListener("submit", this.submitHandler);
  }

  //抽象クラスの定義を満たすためにrenderContent()メソッドを作成。
  renderContent(): void {}

  //入力値のリセット処理
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }

  //ユーザーがインプットした値をバリデーションする。gatherUserInputの返り値は、タプルで指定する。
  private gatherUserInput(): [string, string, number] | void {
    //if文の分岐で空の文字列があった場合に、返り値が何もない時の指定。
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;

    //バリデート関数に渡すオブジェクトの定義。
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };
    //ユーザーが入力した値が空でないかを確認する。
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(mandayValidatable)
    ) {
      //空の文字列が送信された。
      alert("入力値が正しくありません。再度お試しください。");
      return;
    } else {
      //正しい値が入力された。
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  //submitイベントの処理メソッド
  @autobind //autobindの処理をデコレータで追加。
  private submitHandler(event: Event) {
    event.preventDefault(); //このフォームからHTTPリクエストが送られないようにする。
    const userInput = this.gatherUserInput();
    //gatherUserInputからの返り値がタプル（正しい入力値）で返ってきているかの確認。
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday);
      //正しく値が返ってきていれば入力値をクリアする。
      this.clearInputs();
    }
  }
}

import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { Component } from "./base-component";
import { autobind } from "../decorators/autobind";

// ProjectItemクラス リストの項目を表示するクラス。
// ProjectItemクラスは表示に関するクラスなので、Componentクラスを継承する。
//Componentのジェネリック型に
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  //projectプロパティを型をProjectとして定義。
  private project: Project;

  // getter関数の追加。
  get manday() {
    if (this.project.manday < 20) {
      return this.project.manday.toString() + "人日";
    } else {
      return (this.project.manday / 20).toString() + "人月";
    }
  }
  //インスタンス化する際にコンストラクターに追加先のIDと
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    //eventオブジェクトのdataTransferメソッドを呼びだす
    event.dataTransfer!.setData("text/plain", this.project.id);
    //ドラッグしたときの矢印の形を変える
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent): void {
    console.log("Drag終了");
  }

  configure(): void {
    //dragstartイベントは標準のDOMイベント
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    //getter関数mandayを実行している。
    this.element.querySelector("h3")!.textContent = this.manday;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

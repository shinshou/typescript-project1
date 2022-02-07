import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { Component } from "./base-component";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";

//プロジェクトのリストを表示するクラス。
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  //constructorに引数「private tyoe」と指定すると、
  //typeという名称のプロパティを追加できる。
  constructor(private type: "active" | "finished") {
    //ベースクラスのコンストラクターを呼び出す。
    //superの呼び出しが完了するまではthisが使えない。
    super("project-list", "app", false, `${type}-projects`);

    //assignedProjectsの初期値を設定。
    this.assignedProjects = [];

    //下記２つのメソッドはベースクラスからも呼び出しが可能だが、継承クラスにあるメソッドをベースクラスから呼び出すとバグになる可能性がある。
    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      //javascriptでは基本的にdropイベントが禁止されている。dragされた要素が指定位置に来たときにpreventDefaltすることでdropイベントを許可することができる。これでdropイベントが利用できるようになる。
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  //基本的にはパブリックメソッドはプライベートメソッドの上で定義される。
  //ベースクラスでabstractされているので必ず継承クラスではconfigureメソッドの作成が必要。
  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    //addListnerメソッドに関数を定義
    //関数の引数に渡されているprojectsはprojectStateで定義されているプロパティ。
    projectState.addListner((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      //listner関数で何かしらの処理がされたprojectsをaiignedProjectsに格納。
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    //ID名をactive-project-listかfinished-project-listに設定。
    const listId = `${this.type}-project-list`;

    //ulタグのIDに上記をIDにを設定。
    this.element.querySelector("ul")!.id = listId;
    //h2タグの中身にtypeがactiveであれば実行中プロジェクトを挿入。finishedであれば完了プロジェクトを挿入。
    this.element.querySelector("h2")!.textContent =
      this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(listEl.id, prjItem);
    }
  }
}

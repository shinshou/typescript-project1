import { Project, ProjectStatus } from "../models/project";

//関数の型を表すエイリアス。
//型Listnerは引数に配列があり、戻り値は何も返さない
type Listner<T> = (items: T[]) => void;

//状態を定義するクラスを作成。
class State<T> {
  //関数を格納する配列。
  protected listners: Listner<T>[] = [];

  //引数で渡された関数をlistnersプロパティに格納
  addListner(listnerFn: Listner<T>) {
    this.listners.push(listnerFn);
  }
}

//このプロジェクトの状態を監視するクラスを作成。
export class ProjectState extends State<Project> {
  //作成されたプロジェクトを格納する配列。
  private projects: Project[] = [];
  //インスタンスを保持するためのプロパティ
  private static instance: ProjectState;

  //シングルトンクラスconstructorを作成。このプロジェクトないでは必ず一つしかインスタンスが存在しないクラス。privateを定義しているから。このクラスないからでしか、このconstructorは呼び出せない。インスタンス化できない。
  private constructor() {
    super();
  }

  //staticメソッド。このクラスがインスタンス化されていなくてもクラス外からの呼び出しが可能。
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  //プロジェクトの項目取得＋追加メソッド。
  addProject(title: string, description: string, manday: number) {
    //newProjectに新しいプロジェクトを作成。
    //newProjectにProjectクラスのインスタンスを作成。id,title,description,manday,statusの引数を与える。
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      ProjectStatus.Active
    );

    //新規でaddProjectメソッドが実行されたときに、作成されたnewProjectをprojectsプロパティに格納。
    this.projects.push(newProject);
    this.updateListners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListners();
    }
  }

  private updateListners() {
    //addProjectメソッドが実行されるたびに、listners配列に格納されている関数をすべて実行。
    for (const listnerFn of this.listners) {
      //listnerFnに現在のprojects配列を引数として渡す。ただし、オリジナルのデータを引数とするのではなくslice()メソッドで複製を作成。
      listnerFn(this.projects.slice());
    }
  }
}

//staticなメソッドなのでProjectStateをインスタンス化しなくても外部からgetInstanceメソッドを呼び出せる。
export const projectState = ProjectState.getInstance();

//namespaceの読み込み
import { ProjectList } from "./components/project-list";
import { ProjectInput } from "./components/project-input";

//ProjectInputクラスのインスタンスを作成。
const prjInput = new ProjectInput();
//Projectlistクラスのインスタンスを作成。
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");

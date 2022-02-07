// ドラッグアンドドロップ
export interface Draggable {
  //interfaceを定義することで特定のクラスに下記の関数を定義することを強制する。
  //DragEventはtypescriptで定義されている型
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

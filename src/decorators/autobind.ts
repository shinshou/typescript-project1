// オートバインドデコレータ
//デコレータは３つの引数を受け取る。
//target,プロパティ名,プロパティディスクリプタ
export function autobind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  //submitHandler関数のプロパティを取得
  const originalMethod = descriptor.value;
  //プロパティの設定を変更したあとのディスクリプターをadjDesciptorに格納
  const adjDescriptor: PropertyDescriptor = {
    //プロパティを変更できるように。
    configurable: true,
    //submitHandler関数のオリジナルにアクセスするときに実行される。
    get() {
      //submitHandlerにbindメソッドを適応した新しいプロパティの関数をboudFnに格納。
      const boundFn = originalMethod.bind(this);
      //新しくプロパティが更新された関数の返却。
      return boundFn;
    },
  };
  //autobindの返り値をadjDescriptorに設定。
  return adjDescriptor;
}

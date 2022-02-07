//バリデーション関数に渡される引数のプロパティ定義。
export interface Validatable {
  value: string | number;
  //必須ではないバリデーションの項目には？をつけて必ず必要な項目ではないと定義。
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

//バリデーション関数の定義
export function validate(validatableInput: Validatable) {
  //チェック結果を格納する変数の定義
  let isValid = true;
  //渡された入力値が必須入力項目であるかチェック。
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  //最小文字数のチェック
  if (
    validatableInput.minLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  //最大文字数のチェック
  if (
    validatableInput.maxLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  //最小数のチェック
  if (validatableInput.min && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  //最大数のチェック
  if (validatableInput.max && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value < validatableInput.max;
  }
  return isValid;
}

// 海外スパムボット対策：お問い合わせ内容にひらがなが1文字も無ければスパムとみなす。
// クライアント・サーバー双方で同じ判定を使う。
export const HIRAGANA_PATTERN = /[ぁ-ん]/;

export const HIRAGANA_ERROR =
  "お問い合わせ内容には日本語（ひらがな）を含めてご入力ください。";

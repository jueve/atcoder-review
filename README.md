# AtCoder Review
AtCoder Reviewは競技プログラミングサイト[AtCoder](https://atcoder.jp/) の問題の復習に焦点を置いたクロスプラットフォームのデスクトップアプリケーションです。
Electron、SQLite、AtCoder ProblemsのAPIを利用しています。

## インストーラーや実行ファイル
### WindowsとLinux
[releases](https://github.com/jueve/atcoder-review/releases) を参照してください。

### Mac
下記にある「手動でビルドする」を参照してください。


## ユーザー名とデータベースの更新
アプリを立ち上げた後、ホーム画面の右側にある「Update」からユーザー名とのローカルデータベースのアップデートを行います。

### ユーザー名の更新
AtCoder ProblemsのAPIから個人提出の記録を取得する際に使われます。
1. ホーム画面右の「Update」から「User id」をクリックします
2. **AtCoderのユーザー名**を記入して「UPDATE」をクリックすれば完了です。

### データベース更新
復習キューに問題を追加する際はコンテストや問題の情報が必要で、
これらの情報はローカルのデータベースに保存していたものを取得するようアプリ内で処理が働いています。  
このため、あらかじめAtCoder ProblemsのAPIでコンテストや問題のデータを取得しローカルデータベースの更新を行います。  
(インストール直後はローカルデータベースが空の状態なので更新をかけないと復習キューに問題が追加できません。)

1. ホーム画面右の「Update」から「Database」をクリックします
2. 右下にある「UPDATE ALL」をクリックします
3. 更新のアニメーションが全て止まれば完了です

(表示された4つの項目は上から「コンテスト情報」、「問題の情報」、「問題の詳細(難易度等)」、「ユーザーの提出記録」ですが、  
慣れないうちは「UPDATE ALL」を押して4つとも同時に更新して大丈夫です。)

現在自動更新の機能がなく、手動での操作が必要です。  
 

## 手動でビルドする
必要なもの
- [Node.js](https://nodejs.org/en/) ...実行環境
- [yarn](https://yarnpkg.com/) ...パッケージマネージャー

Node.jsとyarnをインストールした状態から以下の操作を行います。

```shell script
git clone git@github.com:jueve/atcoder-review.git atcoder-review
cd atcoder-review
```

パッケージをインストールします。
```shell script
yarn
```

アイコンを生成します。
```shell script
yarn icon
```

OS別に以下のコマンドを打ちます。
```
yarn dist:windows 
yarn dist:mac
yarn dist:linux
```

`dist`ディレクトリに以下の拡張子でファイルが生成されます。
- windows: `.msi`
- mac `.dmg`
- linux: `.deb`

## localhost上で実行する
```
yarn dev
```
ポート番号は`9080`です。

## アンインストール
1. インストーラーや実行ファイルを削除します
2. [ホームディレクトリに](https://nodejs.org/api/os.html#os_os_homedir) `.atcoder-review`というディレクトリが生成されているので以下のコマンドを打ちます
```shell script
cd ~
rm -rf .atcoder-review
```

# バグなど報告
Issueを立てるか[@cashitsuki](https://twitter.com/cashitsuki) までお願いします。

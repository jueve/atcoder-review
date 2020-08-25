# AtCoder Review
AtCoder ReviewはAtCoderの問題の復習に焦点を置いたクロスプラットフォームのデスクトップアプリケーションです。
Electron、SQLite3、AtCoder ProblemsのAPIを利用しています。

## 実行ファイル
### WindowsとLinux
[releases](https://github.com/jueve/atcoder-review/releases) を参照してください。

### Mac
下記にある「手動でビルドする」を参照してください。

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
- linux: `.AppImage`

## localhost上で実行する
```
yarn dev
```
ポート番号は`9080`です。

## アンインストール
1. インストーラーや実行ファイルを削除します
2. ホームディレクトリに`.atcoder-review`というディレクトリが生成されているので以下のコマンドを打ちます
```shell script
cd ~
rm -rf .atcoder-review
```

# MarionettePlayground

- Backbone
- Marionette

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

# 解説
## モジュールの説明と思想
### View
ビューは描画領域を小分けにして、なるべく異なる概念の要素は別ビューに小分けにする  
同じ概念が並列の場合はコレクションビューにする（ユーザーリストとか）

ビューはなるべく階層構造にする  
子ビューでのクリックなどのイベントはなるべく親に上げる。  
それぞれのビューでイベントハンドリングをしだすと複雑になるので、イベントのハンドリングはなるべく集約させたい。  
このあたりはReactにおけるComponentの思想と同じ。

ビジネスロジックではないViewの要件でModelの値をいい感じに改変するのはViewの仕事とする。  
例えばModelの値に応じてcssのwidth: N%を作る場合、ModelにgetPercent()などを作らず、Viewが％への変換を担当する。

## Model
Modelはビジネスロジックだけを担当する。  
表示要件に必要な値の変換などはViewに任せる。

Backboneのget, setはダルいのでラッパーメソッドを提供するのはOK

## Store
アプリケーション全体の状態を管理、更新する唯一のクラス  
各Viewが持つModelは必ずStoreから与えてもらう。

Storeは外部から直接更新してはいけない。  
必ずDispatcher経由でStore自身が管理している各Modelをupdateする。  
（このときsetで更新するか、newでModelを作り直すべきかは検討中）

## Dispatcher
イベント伝搬を担当

アプリケーション全体に影響を及ぼす更新処理は必ず View -> Action -> Store -> Model(View) の方向で更新をさせるので、
そのための橋渡しを行う。

Dispatcherはシングルトン的にアプリケーションでただ一つのインスタンスを使う。  
（実際にシングルトンにしてもいいけど、コードが追いにくくなるのを避けたい）

## ActionCreator
ActionCreatorという名前でいいのか微妙だが、とりあえずこの名前にしておく

Viewで何かを更新するというイベントを発行したとき、Storeが自身を更新するために必要なデータを用意する処理はActionCreatorに任せる。

ほとんどのケースでajaxによる非同期の通信を担当することになるはず。  
successだったらStoreを更新させるイベントを発行し、errorだったらそこでイベントの伝搬を止めてView側にエラーだったことを伝える役目。

## 処理の流れ
Fluxの考えを元にしていて、アプリケーション全体の状態を書き換えるときは必ず以下のフローで更新を行う

View(イベント発行) -> Action(Storeが更新するためのデータを用意) -> Store(Modelをupdate) -> View(管理しているModelのupdateを検知して再描画)

StoreとModelの関係より、Viewは基本的に自身が管理するModelを直接updateすることは避ける。  
ただし、ビジネスロジックが関係ないUI挙動（例えばサイドバーのオープン、クローズなど）であれば自身のModelを直接updateすることも例外として許可する

## 参考
https://azu.github.io/slide/react-meetup/flux.html

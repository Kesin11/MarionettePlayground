# MarionettePlayground

- Backbone
- Marionette
- Backbone.stickit

# Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

# 解説
## モジュールの説明と思想
### View
#### Viewの組み立て方
Viewは描画領域を小分けにして、なるべく異なる概念の要素は別Viewに小分けにする  
同じ概念が並列の場合はコレクションViewにする（ユーザーリストとか）

Viewはなるべく階層構造にする  
子Viewでのクリックなどのイベントはなるべく親に上げる。  
それぞれのViewでイベントハンドリングをしだすと複雑になるので、イベントのハンドリングはなるべく集約させたい。  
このあたりはReactにおけるComponentの思想と同じ。

#### Viewの更新
Viewの更新タイミングは自身が管理するModelがupdateされたときのみ、かつ変数は必ずModelに紐付けることとする。    
onClickなどのイベントをキャッチしてViewを直接書き換えるのは禁止である。  
Viewの見た目がModelの状態から一意に定まることでデバッグが用意になる。このあたりはReact由来の思想。

Backbone.stickitを使って変数バインディングする場合は自然とこの形になるが、もしも使わない場合はmodelEventsを使うことでModelが更新されたときにViewをrender()を呼び出して明示的に再描画させることができる。

```
modelEvents: {
  "change": function() { this.render() }
}
```

#### UI要件での状態の取扱について
基本的にアプリの状態を更新するときは後述のfluxのサイクルに乗せて更新するルールだが、
UI要件の状態（例: ユーザーを選択状態にするなど）に関しては全てfluxに乗せているとキリがないので
例外としてViewが直接Modelを更新してよい。（例: ```model.set('selected', true)```）

ただし、UI要件の状態を表す変数はstateで管理される変数名とは別にする必要がある。  
そうしておかないとstateが更新されるときに現状のUI状態が破壊されてしまう。

### Model(Collection)
Modelはビジネスロジックだけを担当する。  
表示要件に必要な値の変換などはViewに任せる。

Backboneのget, setを毎回書くのはダルいのでラッパーメソッドを提供するのはOK

#### Modelの更新
Modelの更新はfluxの思想に従い、Storeから次の状態（state）をもらって更新する。  
storeはstateを更新したときにイベント通知を行うので、そのイベントを検知してModelを更新する。  
今のところイベントの監視とModelを更新するのはViewの仕事としている。

例外として、Viewの項目で前述したようにUI要件の状態の更新に限ってはstateに関係なく直接Modelを更新してよい。

### Store
アプリケーション全体の状態を管理、更新する唯一のクラス  
各Viewが持つModelの更新は必ずStoreからもらう次のstateを使って行う。

Storeは外部から直接更新してはいけない。  
必ずDispatcher経由でStore自身が管理しているstateを更新する。

Storeはアプリでただ一つのインスタンスを使う。  
（今の実装ではコードが追いにくくなるのでシングルトン化はしていないが、好みの問題）

### Dispatcher
イベント伝搬を担当

アプリケーション全体に影響を及ぼす更新処理はfluxの思想によって View -> Action -> Store -> Model(View) の方向で更新させるのでそのための橋渡しを行う。

DispatcherもStoreと同じくアプリでただ一つのインスタンスを使う。

### ActionCreator
ActionCreatorという名前でいいのか微妙だが、とりあえずこの名前にしておく

Viewが何かを更新するというイベントを発行したとき、Store身を更新するために必要なデータを用意する処理はActionCreatorに任せる。

ほとんどのケースでajaxによる非同期の通信を担当することになるはず。  
successだったらStoreを更新させるイベントを発行し、errorだったらそこでイベントの伝搬を止めてView側にエラーだったことを伝える役目。

## 処理の流れ
fluxの思想に従い、アプリケーション全体の状態を書き換えるときは必ず以下のフローで更新を行う

```
View(イベント発行) -> Action(Storeが更新するためのデータを用意) -> Store(stateを更新) -> Model(state更新を検知してViewが管理しているModelを更新) -> View(Model更新により変数バインディングされた箇所が更新される)
```

大原則として、今のアプリ全体の見た目はあるstateから一意に定まることとする。  
ReactではJSXで組み立てたDOMにstateを渡してViewを更新するので、自然と全体の見た目とstateは1体1で結びつく。

Backboneを使っているとReactとJSXの組み合わせのようにシンプルにはいかないが、ここまで上述してきたように

- Viewの更新はModelによってのみ行われる
- Modelの状態はstateによってのみ更新される

とすることで全体の見た目とstateを1体1で結びつけることは可能である。

## 参考
https://azu.github.io/slide/react-meetup/flux.html

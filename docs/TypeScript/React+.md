# React+
## 组件声明
### 类组件
类组件的定义形式有两种：
 
1、`React.Component<P, S={}> `
 
2、`React.PureComponent<P, S={} SS={}>`
 
它们都是泛型接口，接收两个参数：第一个是 props 类型的定义，第二个是 state 类型的定义，这两个参数都不是必须的，没有时可以省略。React.PureComponent 的第三个参数表示 getSnapshotBeforeUpdate 的返回值。
```typescript
interface IProps {
  name: string;
}

interface IState {
  count: number;
}

interface ISnapshot {
  max: number
}

class App extends React.Component<IProps, IState> {}
class PureApp extends React.PureComponent<IProps, IState, ISnapshot> {}
```
类组件的泛型
```typescript
// 定义组件
class MyComponent<P> extends React.Component<P> {
  internalProp: P;
  constructor(props: P) {
    super(props);
    this.internalProp = props;
  }
  render() {
    return (
    	 <span>hello world</span>
    );
  }
}

// 使用组件
type IProps = { name: string; age: number; };

<MyComponent<IProps> name="React" age={18} />;          // Success
<MyComponent<IProps> name="TypeScript" age="hello" />;  // Error
```
### 函数组件
```typescript
interface IProps {
  name: string
}

const App = (props: IProps) => {
  const {name} = props;

  return (
    <div className="App">
      <h1>hello world</h1>
      <h2>{name}</h2>
    </div>
  );
}

export default App;
```
除此之外，函数类型还可以使用 `React.FunctionComponent<P={}>` 来定义，也可以使用其简写 `React.FC<P={}>`。
```typescript
interface IProps {
  name: string
}

const App: React.FC<IProps> = (props) => {
  const {name} = props;
  return (
    <div className="App">
      <h1>hello world</h1>
      <h2>{name}</h2>
    </div>
  );
}

export default App;
```
使用 React.FC 声明函数组件和普通声明的区别如下：

- React.FC 显式地定义了返回类型，其他方式是隐式推导的；
- React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全；
- React.FC 为 children 提供了隐式的类型（ReactElement | null）

函数组件的泛型
```typescript
// 定义组件
function MyComponent<P>(props: P) {
  return (
  	<span>
    	{props}
    </span>
  );
}

// 使用组件
type IProps = { name: string; age: number; };

<MyComponent<IProps> name="React" age={18} />;          // Success
<MyComponent<IProps> name="TypeScript" age="hello" />;  // Error
```
如果使用箭头函数定义的函数组件，必须使用 extends 关键字来定义泛型参数才能被成功解析。
```typescript
const MyComponent = <P extends any>(props: P) {
  return (
  	<span>
    	{props}
    </span>
  );
}
```
## 内置类型
### JSX.Element
```typescript
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}
```
JSX.Element 是 ReactElement 的子类型，它没有增加属性，两者是等价的。也就是说两种类型的变量可以相互赋值。
 
JSX.Element 可以通过执行 React.createElement 或是转译 JSX 获得：
```typescript
const jsx = <div>hello</div>
const ele = React.createElement("div", null, "hello");
```
### React.ReactElement
```typescript
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
   type: T;
   props: P;
   key: Key | null;
}
```
ReactElement 是一个接口，包括 type、props、key 三个属性值，可以通过传入 <T/> 来注解类组件的实例化。
 
该类型的变量值只能是两种：null 和 ReactElment 实例。
 
通常情况下，函数组件返回 ReactElment（JSX.Element） 的值。
### React.ReactNode
```typescript
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```
ReactNode 是一个联合类型，它可以是 string、number、null、ReactElement、boolean、ReactNodeArray。
 
类组件的 render 成员函数会返回 ReactNode 类型的值。
### CSSProperties
```typescript
export interface CSSProperties extends CSS.Properties<string | number> {
  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
}
```
```typescript
style?: CSSProperties | undefined;
```
## Hooks
### useState
```typescript
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
```
### useEffect
```typescript
type EffectCallback = () => (void | Destructor);
type DependencyList = ReadonlyArray<any>;

function useEffect(effect: EffectCallback, deps?: DependencyList): void;
```
### useMemo
```typescript
type DependencyList = ReadonlyArray<any>;

function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```
### useCallback
```typescript
function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
```
### useRef
```typescript
interface MutableRefObject<T> {
  current: T;
}
interface RefObject<T> {
  readonly current: T | null;
}

function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T|null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```
### useContext
```typescript
interface Context<T> {
  Provider: Provider<T>;
  Consumer: Consumer<T>;
  displayName?: string;
}

function useContext<T>(context: Context<T>): T;
```
### useReducer
```typescript
type Dispatch<A> = (value: A) => void;
type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerWithoutAction<S> = (prevState: S) => S;
type ReducerStateWithoutAction<R extends ReducerWithoutAction<any>> =
  R extends ReducerWithoutAction<infer S> ? S : never;
type DispatchWithoutAction = () => void;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;

function useReducer<R extends ReducerWithoutAction<any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerStateWithoutAction<R>
): [ReducerStateWithoutAction<R>, DispatchWithoutAction];

function useReducer<R extends ReducerWithoutAction<any>>(
  reducer: R,
  initializerArg: ReducerStateWithoutAction<R>,
  initializer?: undefined
): [ReducerStateWithoutAction<R>, DispatchWithoutAction];

function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
```
### useLayoutEffect
```typescript
type EffectCallback = () => (void | Destructor);
type DependencyList = ReadonlyArray<any>;

function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
```
### useImperativeHandle
```typescript
type DependencyList = ReadonlyArray<any>;

function useImperativeHandle<T, R extends T>(ref: Ref<T>|undefined, init: () => R, deps?: DependencyList): void;
```

let Vue
class ModuleCollection {
    constructor(options) { // vuex [] [a] [a,,b]
        this.register([], options); //注册模块，从根注册 空开始
    }
    register(path, rawModule) {
        // path 是个空数组 rawModule就是个对象
        let newModule = {
            _raw: rawModule, // 对象 当前 有state getters
            _children: {}, // 表示他包含的模块
            state: rawModule.state // 自己模的状态
        }
        if (path.length == 0) {
            this.root = newModule
        } else {
            // [a, b];
            // console.log(path.slice(0, -1))
            let parent = path.slice(0, -1).reduce((root, current) => {
                return root._children[current];
            }, this.root)
            parent._children[path[path.length-1]] = newModule
        }
        if (rawModule.modules) { // 有子模块
            forEach(rawModule.modules, (childName, module) => {
                // [a, b, c]
                this.register(path.concat(childName), module)
            })
        }
    }
}
function installModule(store, rootState, path, rootModule) {
    // rootModule.state = {count: 100}
    // rootState.a = {count :200}
    // rootState.a.b = {count :200}

    if (path.length > 0) { // [a]
        // 第二次获取到就是a对应的对象
        let parent = path.slice(0, -1).reduce((root, current) => {
            return root[current]
        }, rootState) // {_raw, children, state}
        // {count: 1000, a:{}}
        Vue.set(parent, path[path.length - 1], rootModule.state)
    }
    if (rootModule._raw.getters) {
        forEach(rootModule._raw.getters, (getterName, getterFn) => {
            Object.defineProperty(store.getters,getterName, {
                get () {
                    return getterFn(rootModule.state)
                }
            });

        })
    }
    if (rootModule._raw.actions) {
        forEach(rootModule._raw.actions, (actionName, actionFn) => {
            let entry = store.actions[actionName] || (store.actions[actionName] = [])
            entry.push(() => {
                actionFn.call(store, store)
            }) 
        })
    }

    if (rootModule._raw.mutations) {
        forEach(rootModule._raw.mutations, (mutationName, mutationFn) => {
            let entry = store.mutations[mutationName] || (store.actions[mutationName] = [])
            entry.push(() => {
                mutationFn.call(store, rootModule.state)
            }) 
        })
    }
    forEach(rootModule._children, (childName, module) => {
        installModule(store, rootState, path.concat(childName), module)
    })
}

class Store {
    constructor(options) {
        let state = options.state; //{count:100}
        this.getters = {}
        this.mutations = {}
        this.mutations = {}
        this.actions = {}
        // 什么样的属性可以实例双向 有get和 set
        // vuex核心就是借用了vue的实例，因为vue的实例数据变化 会刷新视图
        this._vm = new Vue({
            data: {
                state
            }
        })
        // 把模块直接的关系进行整理
        // root._children => a._childrend => b
        this.modules = new ModuleCollection(options)
        // 无论是子模块 还是孙子 所有的mutation 都是根上的
        // this 是store的实例 [] path this.module.root 当前的根模块
        installModule(this, state, [], this.modules.root)
        // if (options.getters) {
        //     let getters = options.getters //{newCount:fn}
        //     forEach(getters, (getterName, getterFn) => {
        //         Object.defineProperty(this.getters, getterName, {
        //             get () {
        //                 // vue.computed实现
        //                 return getterFn(state)
        //             }
        //         })
        //     })
        // }
        // if (options.mutations){
        //     let mutations = options.mutations;
        //     forEach(mutations, (mutationName, mutationFn) => {
        //         // this.mutations.change = () => {change(state)}
        //         this.mutations[mutationName] = () => {
        //             mutationFn.call(this, state)
        //         }
        //     })
        // }

        // if (options.actions) {
        //     let actions = options.actions;
        //     forEach(actions, (actionName, actionFn) => {
        //         this.actions[actionName] = () => {
        //             actionFn.call(this, this)
        //         }
        //     })
        // }
        let {commit, dispatch} = this;
        this.commit = (type) => {
            commit.call(this, type)
        }
        this.dispatch = (type) => {
            dispatch.call(this, type)
        }
    }
    get state () {
        return this._vm.state;
    }
    commit (type) {
        this.mutations[type].forEach(h => h && h())
    }
    dispatch (type) {
        this.actions[type].forEach(h => h && h())
    }
}
function forEach(o, cb) {
    Object.keys(o).forEach(item => cb(item, o[item]))
}
let install = (vue) => {
    Vue = vue; // 保留vue构造函数
    Vue.mixin({
        beforeCreate () {
            // 我需要把根组件中 store 实例 给每个组件都增加一个$store属性
            // 是否是根组件
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else { // 子组件 深度优先 父 -> 子 -> 孙子
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default{
    Store,
    install
}
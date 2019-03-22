import getters from '../getters'
import mutations from '../mutations'
import actions from '../actions'
// 如果增加子模块没有增加namespace 只有状态需要通过模块。属性
// 
export default{
  namespaced: true, // 使用namespaced属性变成一个模块
  state:{
    userName: 'modules-Ryan'
  },
  getters:{

  },
  mutations:{

  },
  actions:{

  }
}
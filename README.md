# scroll-loading

js 监听容器下拉滚动事件<br />
获取数据的自定义方法，放在init回调或者scrollEnd回调里面触发
 

## Usage
demo：<a href="https://cgygd.github.io/scroll-loading/index.html" target="_blank">https://cgygd.github.io/scroll-loading/index.html</a>

### options
1. **element** - 绑定的容器 
    - **type**: String('body' || '#id' || '.class')
    - **required** : true
2. **triggerDistance** - 距离底部多少像素开始触发
    - **type**: Number
    - **required** : false
    - **default** : 0

### Listeners
1. **init** - 初始化成功触发事件
    - **type**: function
2. **scrollEnd** - 每次滚动成功触发事件
    - **type**: function
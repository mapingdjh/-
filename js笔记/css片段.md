# 常用CSS
## [多行文本溢出显示省略号(...)的方法](http://c7sky.com/text-overflow-ellipsis-on-multiline-text.html)

    .ecllipsis {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
    }

> **注意：** a标签应用此样式在安卓中**...**会截断中间文字，而不是结尾处显示**...**
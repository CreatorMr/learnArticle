<template>
    <div>
        <div :class="[{ box: showBtn }, 'words']" :content="describe">
            {{ describe }}
            <span v-if="showBtn" class="btn" @click="showMore">查看更多</span>
        </div>

        <div :class="[{ box: showBtn }, 'words']" :content="describe2">
            {{ describe2 }}
            <span v-if="showBtn" class="btn" @click="showMore">查看更多</span>
        </div>
        <div :class="[{ box: showBtn }, 'words']" :content="describe3">
            {{ describe3 }}
            <span v-if="showBtn" class="btn" @click="showMore">查看更多</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showBtn: true,
            describe: `Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue
            的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另
            一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。注：em是相对长度单位。相对于当前对象内文本的字体尺寸
            。我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。
            注：em是相对长度单位。相对于当前对象内文本的字体尺寸。我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。
            `,
            describe2:'我们中文段落一般每段前空两个汉字。实际上，就度单位。相对于当前对象内文本的象内文本的字体尺寸。我',
            describe3:'我们中文段落一般每段前空两个汉字。实际上，就度单位。相对于当前对象内文本的象内文本的字体尺寸。我我们中文段落一般每段前空两个汉字。实际上，就度单位。相对于当前对象内文本的象内文本的字体尺寸。我我们中文段落一般每段前空两个汉字。实际上，就度单位。相对于当前对象内文本的象内文本的字体尺寸。我'
        }
    },
    methods: {
        showMore() {
            this.showBtn = false
        }
    }
}
</script>
<style type="text/css">
.words {
    max-height: 40px;
    color: #666;
    font-size: 14px;
    position: relative;
    border:1px solid red;
    height: 72px;
}
.box {
    color: #fff;
}
.box::before,
.box::after {
    content: attr(content);
    overflow: hidden;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    color: #666;
    line-height: 20px;
}
.box::before {
    max-height: 20px;
    z-index: 2;
    background: #fff;
}
.box::after {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-line-clamp: 2;
    text-indent: -4em;
    padding-right: 4em;
}
.box .btn {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 3;
    color: #696;
    line-height: 20px;
}
</style>


<template>
    <span class="menu">
        <button class="dots" @click="pressed=!pressed">
            .
            .
            .
        </button>
        <div class="options" v-if="pressed">
            <span v-for="option in options" @click="option.action">
                {{option.title}}
            </span>
        </div>
    </span>
</template>

<script>
    export default {
        name: "OptionMenu",
        data() {
            return ({
                pressed: false
            })
        },
        props: ["options"]
    }
</script>

<style>
    .options>span:hover {
        background-color: #eee
    }
    .dots {
        font-weight: bold
    }
    .menu {
        display: inline-block
    }
</style>
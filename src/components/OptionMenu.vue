<template>
    <span class="menu">
        <button class="dots" @click="menuSwitch">
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
                pressed: false,
            })
        },
        props: ["options"],
        methods: {
            menuSwitch() {
                this.pressed = !this.pressed;
            }
        }
    }
</script>

<style>
    .options>span:hover {
        background-color: #eee
    }
    .dots {
        font-weight: bold
    }
    .options>span {
        display: block;
        z-index: 1
    }
</style>
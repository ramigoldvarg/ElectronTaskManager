<template>
    <span class="menu">
        <button class="dots fa fa-ellipsis-v" @click="menuSwitch">
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
        opacity: 0.75;
        background-color: rgba(0,0,0,0); 
        border-color: rgba(0,0,0,0);
    }
    .options {
        width: 3em;
        position: absolute;
        z-index: 100;
        box-shadow: 0 0 4px rgba(0,0,0,0.2);
        background-color: white
    }
    .options>span {
        width: 100%
    }
</style>
<template>
    <span class="menu">
        <button :class="{ 'pressed': pressed }" class="dots fa fa-ellipsis-v" @blur="endFocus" @click="pressed=!pressed">
        </button>
        <div class="options" v-if="pressed">
            <div v-for="option in options" @click="option.action">
                {{option.title}}
            </div>
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
            switchPress() {
                this.pressed = false;
            },
            endFocus(e) {
                setTimeout(this.switchPress, 500)
            }
        }
    }
</script>

<style>
    .options>div:hover {
        background-color: #eee
    }
    .dots {
        opacity: 0.75;
        background-color: rgba(0,0,0,0); 
        border-color: rgba(0,0,0,0);
    }
    .dots:focus {
        outline: transparent;
    }
    .pressed {
        box-shadow: 3px 3px #eee
    }
    .options {
        width: 3.5em;
        position: absolute;
        z-index: 100;
        box-shadow: 0 0 4px rgba(0,0,0,0.2);
        background-color: white;
        margin: 2px 0;
        padding: 2px 0
    }
    .options>div {
        width: 90%;
        padding: 0 5%;
        direction: rtl
    }
</style>
<template>
    <div class="main-menu">
        <div
            v-for="(num, index) in array"
            :key="num"
            class="line-menu"
            @mouseenter.self.stop="expand(index)"
            @mouseleave.self.stop="expand(index)"
            @click="action(num.title)">
            <img :src="'' + num.src" />
            <div v-if="num.show" class="textHover">{{ num.title }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            array: [
                {
                    show: false,

                    src: new URL("../assets/icons/user.png", import.meta.url),
                    title: "Profile",
                },
                {
                    show: false,
                    src: new URL(
                        "../assets/icons/document.png",
                        import.meta.url
                    ),
                    title: "Rules",
                },
                {
                    show: false,
                    src: new URL("../assets/icons/github.png", import.meta.url),
                    title: "GitHub",
                },
                {
                    show: false,
                    src: new URL("../assets/icons/logout.png", import.meta.url),
                    title: "LogOut",
                },
            ],
        };
    },
    methods: {
        expand(num) {
            this.array[num].show = !this.array[num].show;
        },
        action(title) {
            switch (title) {
                case "Prifole":
                    break;
                case "Rules":
                    window.open(
                        "https://www.chess.com/learn-how-to-play-chess",
                        "_blank"
                    );
                    break;
                case "GitHub":
                    window.open(
                        "https://github.com/iliailiaxxx/Chess",
                        "_blank"
                    );
                    break;
                case "LogOut":
                    fetch(process.env.VUE_APP_REQUEST_URL + 'logout', {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(),
                    })
                    location.reload()
                    break
            }
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

@media screen and (max-width: 120vh){
    .main-menu{
        display: flex;
        justify-content: space-around;
    }
}
.main-menu {
    font-family: "Poppins", sans-serif;
    padding: 2vh;
    width: 100%;
    background-color: #3c2f2f;
}
.line-menu {
    width: fit-content;
    padding: 2vh;
    margin: 2vh;
    line-height: 5vh;
    display: flex;
    background-color: #90755b;
    border-radius: 15px;
}
.line-menu:hover {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1s;
    box-shadow: inset 0px 0px 0px 2px black;
}
.textHover {
    margin-left: 3vh;
}
img {
    height: 5vh;
    width: 5vh;
}
</style>

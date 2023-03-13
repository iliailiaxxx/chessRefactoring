<template>
    <div class="mainGeneral">
        <div class="playerBoardW">
            <timerw />
        </div>
        <div class="main">
            <div
                v-for="(item, index) in board"
                v-bind:key="index"
                :class="{
                    //define white or black class
                    white:
                        (item[0] % 2 == 0 && item[1] % 2 == 1) ||
                        (item[0] % 2 == 1 && item[1] % 2 == 0),
                    black:
                        (item[0] % 2 == 1 && item[1] % 2 == 1) ||
                        (item[0] % 2 == 0 && item[1] % 2 == 0),
                }"
                class="square"
                @:click="send()">
                <img
                    :src="render(index)"
                    onerror='this.style.display = "none"' />
            </div>
        </div>
        <div class="playerBoardB">
            <timerb />
        </div>
    </div>
</template>

<script>
import timerw from "./timerw.vue";
import timerb from "./timerb.vue";

export default {
    data() {
        return {
            info: "",
            board: [
                "81",
                "82",
                "83",
                "84",
                "85",
                "86",
                "87",
                "88",
                "71",
                "72",
                "73",
                "74",
                "75",
                "76",
                "77",
                "78",
                "61",
                "62",
                "63",
                "64",
                "65",
                "66",
                "67",
                "68",
                "51",
                "52",
                "53",
                "54",
                "55",
                "56",
                "57",
                "58",
                "41",
                "42",
                "43",
                "44",
                "45",
                "46",
                "47",
                "48",
                "31",
                "32",
                "33",
                "34",
                "35",
                "36",
                "37",
                "38",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
            ],
            images: {
                empty: new URL("../assets/icons/empty.png", import.meta.url),
                bpawn: new URL("../assets/icons/bpawn.png", import.meta.url),
                wpawn: new URL("../assets/icons/wpawn.png", import.meta.url),
                bbishop: new URL(
                    "../assets/icons/bbishop.png",
                    import.meta.url
                ),
                bking: new URL("../assets/icons/bking.png", import.meta.url),
                bknight: new URL(
                    "../assets/icons/bknight.png",
                    import.meta.url
                ),
                bqueen: new URL("../assets/icons/bqueen.png", import.meta.url),
                brook: new URL("../assets/icons/brook.png", import.meta.url),
                wbishop: new URL(
                    "../assets/icons/wbishop.png",
                    import.meta.url
                ),
                wking: new URL("../assets/icons/wking.png", import.meta.url),
                wknight: new URL(
                    "../assets/icons/wknight.png",
                    import.meta.url
                ),
                wqueen: new URL("../assets/icons/wqueen.png", import.meta.url),
                wrook: new URL("../assets/icons/wrook.png", import.meta.url),
            },
            position: [
                "brook",
                "bknight",
                "bbishop",
                "bqueen",
                "bking",
                "bbishop",
                "bknight",
                "brook",
                "bpawn",
                "bpawn",
                "bpawn",
                "bpawn",
                "bpawn",
                "bpawn",
                "bpawn",
                "bpawn",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "wpawn",
                "wpawn",
                "wpawn",
                "wpawn",
                "wpawn",
                "wpawn",
                "wpawn",
                "wpawn",
                "wrook",
                "wknight",
                "wbishop",
                "wqueen",
                "wking",
                "wbishop",
                "wknight",
                "wrook",
            ],
        };
    },
    methods: {
        send() {
            fetch(process.env.VUE_APP_REQUEST_URL + "logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            });
        },
        render(index) {
            if (this.position[index]) {
                function whatPieceToRender(i, str) {
                    switch (str) {
                        case "bpawn":
                            return i.images.bpawn;
                        case "wpawn":
                            return i.images.wpawn;
                        case "bbishop":
                            return i.images.bbishop;
                        case "wbishop":
                            return i.images.wbishop;
                        case "bknight":
                            return i.images.bknight;
                        case "wknight":
                            return i.images.wknight;
                        case "brook":
                            return i.images.brook;
                        case "wrook":
                            return i.images.wrook;
                        case "bking":
                            return i.images.bking;
                        case "wking":
                            return i.images.wking;
                        case "bqueen":
                            return i.images.bqueen;
                        case "wqueen":
                            return i.images.wqueen;
                    }
                }
                return whatPieceToRender(this, this.position[index]);
            } else {
                return this.images.empty;
            }
        },
    },
    components: {
        timerb,
        timerw,
    },
};
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.mainGeneral {
    border: 0.5vh solid black;
    border-radius: 5px;
    width: fit-content;
}
.playerBoardW {
    box-shadow: 0 0 black inset, 0 -0.5vh rgb(0, 0, 0) inset,
        0 0 rgb(0, 0, 0) inset, 0 0 rgb(0, 0, 0) inset;
    background-color: #4b3832;
    width: 80vh;
    height: 9.5vh;
}
.playerBoardB {
    box-shadow: 0 0 black inset, 0 0.5vh rgb(0, 0, 0) inset,
        0 0 rgb(0, 0, 0) inset, 0 0 rgb(0, 0, 0) inset;
    background-color: #4b3832;
    width: 80vh;
    height: 9.5vh;
}
.main {
    height: 80vh;
    width: 80vh;
    display: grid;
    background-color: #000000;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 1fr;
}
.white {
    background-color: #fff4e6;
}
.black {
    background-color: #90755b;
}
.square {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
img {
    margin-top: 4%;
    height: 92%;
    width: 92%;
}
</style>

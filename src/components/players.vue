<template>
    <div class="main-players">
        <div class="desk" @click="hide()" :class="{ 'desk-hide': hiden }">
            <div class="onlineDiv">
                Players Online:
            </div>
            <div v-for="player in onlinePlayers" :key="player"
            class="onePlayer">
                {{ player }}
            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
export default {
    props: ["user"],
    data() {
        return {
            onlinePlayers: ["John", "James", "Ivan"],
            hiden: true,
            name: "Ilia",
            socket: "",
        };
    },
    methods: {
        hide() {
            this.hiden = !this.hiden;
        },
    },
    watch: {
        user() {
            (this.socket = io("http://localhost:3000", {
                withCredentials: true,
            })),
                this.socket.on("get-user", () => {
                    if (this.name !== "") {
                        setTimeout(() => {
                            this.socket.emit("send-user", { name: this.name });
                        }, 0);
                    }
                });
            this.socket.on("send-list", (data) => {
                this.onlinePlayers = data.map((e) => {
                    return e === this.name ? null : e;
                });
            });
        },
    },
    mounted() {},
};
</script>

<style scoped>
.main-players {
    padding: 2vh;
    padding-bottom: 0;
    height: 98vh;
    display: flex;
    flex-direction: column;
    justify-content: end;
}
@media screen and (max-width: 100vh) {
    .main-players {
        justify-content: start;
    }
}
.desk {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1s;
    border-radius: 15px;
    border: 3px solid black;
    height: 50vh;
    background-color: #90755b;
    padding: 1vh;
    overflow: hidden;
}
.onlineDiv{
    margin: 2vh;
    padding: 1vh;
    border-radius: 15px;
    background-color: #fff4e6;
}
.desk-hide {
    height: 10vh;
}
</style>

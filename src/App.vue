<script setup>
import board from "./components/board.vue";
import login from "./components/login.vue";
import menur from "./components/menu.vue";
import players from "./components/players.vue";

</script>

<script>
export default {
    components: {
        login,
        players
    },
    data() {
        return {
            user: "",
        };
    },
    mounted() {
        fetch("http://localhost:3000/login", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((r) => {
                if (r.login) {
                    this.user = r.user.email;
                }
            })
            .catch(function () {
                console.log("error");
            });
    },
}
</script>

<template>
    <header>
        <login :user="this.user"></login>
        <div class="wrapper" v-cloak>
            <div class="boxess">
                <menur></menur>
            </div>
            <board></board>
            <div class="boxess">
                <players :user="this.user"></players>
            </div>
        </div>
    </header>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

[v-cloak] {
    display: none;
}
* {
    font-family: "Poppins", sans-serif;
    padding: 0;
    margin: 0;
}
@media screen and (max-width: 120vh) {
    .wrapper {
        flex-direction: column;
        align-items: center;
    }
}
.wrapper {
    height: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #3c2f2f;
}
.boxess {
    width: 100%;
}
</style>

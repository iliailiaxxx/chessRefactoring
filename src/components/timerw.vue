<template>
    <div class="timer">{{ formatTime }}</div>
</template>

<script>
export default {
    data() {
        return {
            time: 600, // in seconds
            intervalId: null,
            isRunning: false,
        };
    },
    computed: {
        formatTime() {
            const minutes = Math.floor(this.time / 60)
                .toString()
                .padStart(2, "0");
            const seconds = (this.time % 60).toString().padStart(2, "0");
            return `${minutes}:${seconds}`;
        },
    },
    methods: {
        startTimer() {
            this.isRunning = true;
            this.intervalId = setInterval(() => {
                if (this.time > 0) {
                    this.time--;
                } else {
                    this.stopTimer();
                }
            }, 1000);
        },
        stopTimer() {
            this.isRunning = false;
            clearInterval(this.intervalId);
        },
    },
};
</script>
<style scoped>
.playerBoardW .timer {
    max-height: 100%;
    height: 100%;
    box-shadow: 0 0 black inset, 0 -0.5vh rgb(0, 0, 0) inset, 0 0 blue inset,
        0.5vh 0 rgb(0, 0, 0) inset;
    float: right;
    text-align: center;
    font-size: 6.7vh;
    border-radius: 0px;
    width: 20vh;
    background-color: #3c2f2f;
    color: #90755b;
    align-items: center;
    justify-content: center;
    display: flex;
}
</style>

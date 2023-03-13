<template>
    <div>
        <div class="modal" :class="{ active: showed }" @click="close()"></div>
        <div class="center">
            <div class="container" :class="{ active: showed }">
                <label
                    @click="close()"
                    for="show"
                    class="close-btn"
                    title="close"
                    >×</label
                >
                <div class="text">{{ title }}</div>
                <form>
                    <div class="data">
                        <label
                            :style="{
                                color:
                                    this.serverMessage === 'already exist ×'
                                        ? '#800000'
                                        : this.serverMessage === 'registered ✓'
                                        ? '#006600'
                                        : this.serverMessage === 'or password incorrect'
                                        ? '#800000'
                                        : '',
                            }"
                            >Username {{ serverMessage }}</label
                        >
                        <input type="text" v-model="email" />
                    </div>
                    <div class="data">
                        <label>Password</label>
                        <input type="password" v-model="password" />
                    </div>
                    <div class="btn">
                        <div class="inner"></div>
                        <button
                            type="button"
                            @click="
                                this.titleBtn === 'LOGIN' ? login() : register()
                            ">
                            {{ titleBtn }}
                        </button>
                    </div>
                    <div class="signup-link">
                        {{ question }}
                        <a @click="registerOrLogin()">{{ questionLink }}</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["user"],

    data() {
        return {
            email: "",
            password: "",
            serverMessage: "",

            title: "Login form",
            titleBtn: "LOGIN",
            question: "Not a member?",
            questionLink: "Sign up now",
            registerOrLoginString: "login",

            showed: true,
        };
    },
    watch: {
        user() {
            this.showed = false;
        },
    },
    methods: {
        changeEmailField(res) {
            this.serverMessage = res;
        },
        close() {
            this.showed = !this.showed;
        },
        async sendData(url) {
            const dataSend = {
                username: this.email,
                password: this.password,
            };
            const response = await fetch("http://localhost:3000/" + url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataSend),
            });
            return response;
        },
        async login() {
            await this.sendData("login")
                .then((response) => response.json())
                .then((res) => {
                    if (res.login) {
                        location.reload()
                    }
                    if (res.login === false) {
                        this.changeEmailField("Wrong name or password");
                    }
                })
                .catch((res) => {
                    console.log(res);
                    this.changeEmailField("or password incorrect");
                });
        },
        async register() {
            await this.sendData("register")
                .then((response) => response.json())
                .then((res) => {
                    this.changeEmailField(res.message);
                    setTimeout(() => {
                        this.serverMessage = "";
                        if (res.success) this.registerOrLogin();
                    }, 1500);
                });
        },

        registerOrLogin() {
            this.title === "Login form"
                ? (this.title = "Register form")
                : (this.title = "Login form"),
                this.titleBtn === "LOGIN"
                    ? (this.titleBtn = "REGISTER")
                    : (this.titleBtn = "LOGIN"),
                this.question === "Not a member?"
                    ? (this.question = "Already a member?")
                    : (this.question = "Not a member?"),
                this.questionLink === "Sign up now"
                    ? (this.questionLink = "Login now")
                    : (this.questionLink = "Sign up now");
            this.registerOrLoginString === "login"
                ? (this.registerOrLoginString = "register")
                : (this.registerOrLoginString = "login");
        },
    },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}
.modal {
    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 50%;
    position: fixed;
    display: none;
}
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
}
input[type="checkbox"] {
    display: none;
}
.container {
    display: none;
    background: #90755b;
    width: 410px;
    padding: 30px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
.active {
    display: block;
}
.container .close-btn {
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 18px;
    cursor: pointer;
}
.container .close-btn:hover {
    color: #3c2f2f;
}
.container .text {
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    color: #181818;
}
.container form {
    margin-top: -20px;
}
.container form .data {
    height: 45px;
    width: 100%;
    margin: 40px 0;
}
form .data label {
    color: #181818;
    font-size: 18px;
}
form .data input {
    height: 100%;
    width: 100%;
    padding-left: 10px;
    font-size: 17px;
    border: 3px solid #4b3832;
    border-radius: 5px;
    background-color: #4b3832;
    color: #fff4e6;
}
form .data input:focus {
    border-color: #282828;
    border-bottom-width: 2px;
}
form .btn {
    margin: 30px 0;
    height: 45px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
}
form .btn .inner {
    height: 100%;
    width: 300%;
    position: absolute;
    left: -100%;
    z-index: -1;
    background: -webkit-linear-gradient(
        right,
        #4b3832,
        #3c2f2f,
        #4b3832,
        #3c2f2f
    );
    transition: all 0.4s;
}
form .btn:hover .inner {
    left: 0;
}
form .btn button {
    height: 100%;
    width: 100%;
    background: none;
    border: none;
    color: #fff4e6;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
}
form .signup-link {
    text-align: center;
}
form .signup-link {
    color: #181818;
}
form .signup-link a {
    color: #fff4e6;
    text-decoration: none;
}
form .signup-link a:hover {
    text-decoration: underline;
}
</style>

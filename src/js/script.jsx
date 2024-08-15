import * as axios from 'axios'
const client = axios.default;

var app = new Vue({
    el: '#dowebok',
    data() {
        return {
            projectDate: '',
            projectTitle: '',
            projectTheme: '',
            email: '',
            username: '',
            password: '',
            showPassword: false,
            emailError: false,
            emailErrorText: '',
            usernameError: false,
            usernameErrorText: '',
            passwordError: false,
            passwordErrorText: ''
        }
    },
    methods: {
        checkUsername: function (e) {

            if (!this.username) {
                this.usernameError = true
                this.usernameErrorText = '请输入用户名'
            } else {
                this.usernameError = false
            }
        },
        checkPassword: function () {
            if (!this.password) {
                this.passwordError = true
                this.passwordErrorText = '请输入密码'
            } else {
                this.passwordError = false
            }
        },
        checkEmail: function (e) {
            const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
            if (!this.email) {
                this.emailError = true
                this.emailErrorText = '请输入电子邮箱'
            } else if (!reg.test(this.email)) {
                this.emailError = true
                this.emailErrorText = '电子邮箱格式不正确'
            } else {
                this.emailError = false
            }
        },
        login: function () {
            this.checkUsername()
            this.checkPassword()
            if (this.usernameError || this.passwordError) {
                return
            } else {
                client.post('http://127.0.0.1:7001/api/check_user',
                    {
                        username: this.username,
                        password: this.password
                    }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((respones) => {
                    if (!respones.data.data.success) {
                        alert(respones.data.data.message)
                    } else {
                        window.location.href = "../../main/project.html?uid=" + respones.data.data.uid
                    }

                })
            }
        },
        sign: function () {
            this.checkUsername()
            this.checkPassword()
            this.checkEmail()
            if (this.usernameError || this.passwordError || this.emailError) {
                return
            } else {
                client.post('http://127.0.0.1:7001/api/signup_user',
                    {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((respones) => {
                    if (!respones.data.data.success) {
                        alert(respones.data.data.message)
                        window.location.href = "/sign.html"
                    } else {
                        alert(respones.data.data.message)
                        window.location.href = "/index.html"
                    }

                })
            }
        },
        forget: function () {
            this.checkUsername()
            this.checkEmail()
            if (this.usernameError || this.emailError) {
                return
            } {
                client.post('http://127.0.0.1:7001/api/forget_user',
                    {
                        username: this.username,
                        email: this.email
                    }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((respones) => {
                    if (!respones.data.data.success) {
                        alert(respones.data.data.message)
                    } else {
                        alert("你的密码是admin123")
                        window.location.href = "/index.html"
                    }

                })
            }


        }

    }
})


var app = new Vue({
    el: '#dowebok',
    data() {
        return {
            email:'',
            username: '',
            password: '',
            showPassword: false,
            emailError:false,
            emailErrorText:'',
            usernameError: false,
            usernameErrorText: '',
            passwordError: false,
            passwordErrorText: ''
        }
    },
    methods: {
        checkUsername: function(e) {
            
            if (!this.username) {
                this.usernameError = true
                this.usernameErrorText = '请输入用户名'
            }  else {
                this.usernameError = false
            }
        },
        checkPassword: function() {
            if (!this.password) {
                this.passwordError = true
                this.passwordErrorText = '请输入密码'
            } else {
                this.passwordError = false
            }
        },
        checkEmail: function(e) {
            const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
            if (!this.email) {
                this.emailError = true
                this.emailErrorText = '请输入电子邮箱'
            } else if(!reg.test(this.email)) {
                this.emailError = true
                this.emailErrorText = '电子邮箱格式不正确'
            } else {
                this.emailError = false
            }
        },
        login: function() {
            this.checkUsername()
            this.checkPassword()
            if (this.usernameError || this.passwordError) {
                return
            } else {
                window.location.href="../../main/project.html" 
            }
        }
    }
})
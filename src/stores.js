import { defineStore } from "pinia"


export let authUserStore = defineStore("authUser", {
    state: () => ({
        authenticaed: false, 
        profile: null
    }),
    actions: {
        async Login() {
            let response = await fetch("/user")
            let data = await response.json();
            

            if(data.success) {
                this.authenticaed = true;
                this.profile = data.body
            }
        }
    }
})
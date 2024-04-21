import { defineStore } from "pinia"


export const authUserStore = defineStore("authUser", {
    state: () => ({
        authenticated: false, 
        profile: null
    }),
    actions: {
        async Login() {
            let response = await fetch("/user")
            let data = await response.json();
            
            if(data.success) {
                this.authenticated = true;
                this.profile = data.body;
            } else {
                this.authenticated = false;
                this.profile = null;
            }
        },
    }
})
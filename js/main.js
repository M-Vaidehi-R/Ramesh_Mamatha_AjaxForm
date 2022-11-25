import { SendMail } from "./components/mailer.js";

(() => {

   const FFName=document.getElementById("firstname"),
         FLName=document.getElementById("lastname"),
         FEmail=document.getElementById("email"),
         FMessage=document.getElementById("message");
    
    const { createApp } = Vue

    createApp({
        data() {
            return {
                message: 'Hello Vue!',
                ErrorFname: false,
                ErrorLname: false,
                ErrorEmail: false,
                ErrorMessage: false
            }
        },

        methods: {
            processMailFailure(result) {
                // show a failure message in the UI
                // use this.$refs to connect to the elements on the page and mark any empty fields/inputs with an error class
                //alert('failure! and if you keep using an alert, DOUBLE failure!');
                //For first name

                if(FFName.value.length > 0){
                    console.log("first name entered");
                   // this.$refs.fname.classList.remove("error");
                    this.ErrorFname = false;
                }
                else{
                  //  this.$refs.fname.classList.add("error");
                    this.ErrorFname=true;
                    console.log("enter ur first name");
                }
                //console.log(FName.length);

                 //For last name name
                if(FLName.value.length > 0){
                    console.log("last name entered");
                  //  this.$refs.lname.classList.remove("error");
                    this.ErrorLname = false;
                }
                else{
                   // this.$refs.lname.classList.add("error");
                    this.ErrorLname=true;
                    console.log("enter ur last name");
                }

                //For email
                if(FEmail.value.length > 0){
                    console.log("email entered");
                   // this.$refs.email.classList.remove("error");
                    this.ErrorEmail = false;
                }
                else{
                   // this.$refs.email.classList.add("error");
                    this.ErrorEmail=true;
                    console.log("enter ur email");
                }

                //For message
                if(FMessage.value.length > 0){
                    console.log("message entered");
                    //this.$refs.message.classList.remove("error");
                    this.ErrorMessage = false;
                }
                else{
                   // this.$refs.message.classList.add("error");
                    this.ErrorMessage=true;
                    console.log("enter ur message");
                }
                // show some errors in the UI here to let the user know the mail attempt was successful
            },

            processMailSuccess(result) {
                // show a success message in the UI
                //alert("success! but don't EVER use alerts. They are gross.");        
                // show some UI here to let the user know the mail attempt was successful
                this.successMessage = true;
                this.$refs.fname.classList.remove("error");
                this.$refs.lname.classList.remove("error");
                this.$refs.email.classList.remove("error");
                this.$refs.message.classList.remove("error");
                this.ErrorFname = false;
                this.ErrorLname = false;
                this.ErrorEmail = false;
                this.ErrorMessage = false;
            },

            processMail(event) {        
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();
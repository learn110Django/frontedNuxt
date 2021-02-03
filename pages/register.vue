<template>
<div class="container col-md-6 mt-5">
    <h2>Register</h2>
      <!-- <Notification :message="error" v-if="error"/> -->
      <div class="text-danger" v-if="errors.name">{{ errors.name[0] }}</div>
     <div class="text-danger" v-if="errors.email">{{ errors.email[0] }}</div>
     <div class="text-danger" v-if="errors.email">{{ errors.email[1] }}</div>
     <div class="text-danger" v-if="errors.password">{{ errors.password[0] }}</div>


    <br>
      <form @submit.prevent="submit">
            <div class="form-group">
                <label>Full name</label>
                <input

                name="username"
                v-model="name"
                type="text" class="form-control" placeholder="Enter full name" >
                 <!-- <small class="form-text text-danger" v-if="errors.name">{{errors.name[0]}}</small> -->

            </div>
            <div class="form-group">
                <label>Email address</label>
                <input

                  name="email"
                  v-model="email"
                type="email" class="form-control" placeholder="Enter email" >
                  <!-- <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small> -->

            </div>
            <div class="form-group">
                <label>Password</label>
                <input

                 name="password"
                  v-model="password"
                type="password" class="form-control"  placeholder="Password" >
                <!-- <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small> -->

            </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <br>
    <p>Already have account <nuxt-link  to="/login">Login</nuxt-link></p>
</div>

</template>

<script>
// import Notification from '~/components/Notification'
export default {
  //   components: {
  //   Notification,
  // },
   middleware:['guest'],
   data(){
       return{
            email:'',
            password:'',
            name:'' ,
            errors:{}
       }
   },
   methods:{
     async  submit(){

         try {

            await this.$axios.$post('register',{
            name: this.name,
            email: this.email,
            password: this.password
           })

            await this.$auth.loginWith('local', {
            data: {
                email: this.email,
                password: this.password
             },
            })
             this.$router.push({
               path:this.$route.query.redirect || "/dashboard"
             })

         } catch (e) {
          //  this.error.push(e.response.data.errors["email"][0])
               this.errors = e.response.data.errors

         }


       }
   }
}
</script>

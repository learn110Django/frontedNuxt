<template>
<div class="container col-md-6 mt-5">
    <h2>Login</h2>
    <!-- <Notification :message="error" v-if="error"/> -->
    <div class="text-danger" v-if="errors.email">{{ errors.email[0] }}</div>
     <div class="text-danger" v-if="errors.email">{{ errors.email[1] }}</div>
     <div class="text-danger" v-if="errors.password">{{ errors.password[0] }}</div>

    <br>
       <form @submit.prevent="login">
      <div class="form-group">
        <label>Email address</label>
        <input

        name="email"
        v-model="email"
        type="email" class="form-control" placeholder="Enter email" autofocus required>
        <!-- <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small> -->
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
         name="password"
         v-model="password"
         type="password" class="form-control" placeholder="Password" required>
        <!-- <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small> -->
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p>Don't have account?<nuxt-link to="/register">Register</nuxt-link></p>
</div>

</template>


<script>
// import Notification from '~/components/Notification'
export default {
  middleware:['guest'],
      data(){
          return{

                  email:'',
                  password:'',
                 errors:{}
          }
      },
      methods:{
        async  login(){
              try {

                 await this.$auth.loginWith('local',{
                 data: {
                  email: this.email,
                  password: this.password
                }
            })
             this.$router.push({
               path:this.$route.query.redirect || "/dashboard"
             })

              } catch (e) {
                 this.errors = e.response.data.errors
              }
          }
      }
}
</script>

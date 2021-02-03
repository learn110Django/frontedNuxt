<template>
   <div class="container">
      <h2>Update Topic</h2>

     <form @submit.prevent="update">
         <div class="form-group mt-5">
           <input
             type="text"
              class="form-control"
              v-model="topic.title"
           >
           <span class="text-danger" v-if="errors.title">{{ errors.title[0] }}</span>
         </div>
       <button class="btn btn-outline-success">Update</button>
     </form>
        <p class="mt-5 btn btn-outline-warning">
          <nuxt-link to="/topics">Back</nuxt-link>
        </p>
   </div>
</template>


<script>
   export default {
         data(){
           return{
               topic:{title:''},
               errors:{}
           }
         },
       async asyncData({$axios,params}){

              let {data}=await  $axios.$get(`/topics/${params.id}`)
              return{
                topic:data
              }
       },
     methods:{
           async update(){
              try{
                await  this.$axios.patch(`/topics/${this.$route.params.id}`,{
                  title:this.topic.title
                })
                this.$router.push('/topics')
              }catch (e) {
                this.errors = e.response.data.errors
              }
           }

     }
   }
</script>

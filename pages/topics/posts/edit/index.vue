<template>
  <div class="container">
    <h2>Update Post</h2>

    <form @submit.prevent="update">
      <div class="form-group mt-5">
        <textarea
          type="text"
          name="body"
          class="form-control"
          v-model="post.body"
        ></textarea>
                   <span class="text-danger" v-if="errors.body">{{ errors.body[0] }}</span>
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
        post:{body:''},
        errors:{}
      }
    },
    async asyncData({$axios,params}){

      let {data}=await  $axios.$get(`/topics/${params.id}/posts/${params.body}`)
      return{
        post:data
      }
    },
    methods:{
      async update(){
        try{
          await  this.$axios.$patch(`/topics/${this.$route.params.id}/posts/${this.$route.params.body}`,{
            body:this.post.body
          })
          this.$router.push('/topics')
        }catch (e) {
          this.errors = e.response.data.errors
        }
      }

    }
  }
</script>

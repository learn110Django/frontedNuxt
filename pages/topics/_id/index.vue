<template>
  <div class="container">

    <div  class="bg-light mt-5 mb-5" style="padding: 20px;">
      <h3 class="display-3">{{topic.title}}</h3>
      <small class="text-muted">{{topic.created_at}} by {{topic.user.name}}</small>
      <hr>
      <div v-for="(content ,index) in topic.posts" :key="index" class="ml-5 content">
        <p> {{content.body}}</p>

        <div v-if="authenticated">
          <div v-if="user.id === content.user.id">
            <button @click="deletePost(content.id)" class="btn btn-outline-danger fa fa-trash  float-right"></button>
            <nuxt-link :to="{name:'topics-posts-edit',params:{id: $route.params.id ,body: content.id}}" >
              <button class="btn btn-outline-success fa fa-edit  float-right"></button>
            </nuxt-link>
          </div>
        </div>

       <p class=" pt-4"> <small class="text-muted">{{content.created_at}} by {{content.user.name}}</small></p>
      </div>
    </div>

    <div class="mt-5 ml-5 mb-5" v-if="authenticated">
      <form @submit.prevent="create">
        <div class="form-group">
          <label>Add a new Post</label>
          <textarea
            v-model="body"
            name="body"
            rows="3"
            type="text" class="form-control" placeholder="write new post here.."
          ></textarea>
          <span class="text-danger" v-if="errors.body">{{ errors.body[0] }}</span>
        </div>
         <button class="btn btn-outline-primary">Add Post</button>

      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        topic: '',
        body:'',
        errors:{}
      }
    },
    async asyncData({$axios,params}){
     const {data}=await $axios.$get(`/topics/${params.id}`)
      return {
        topic:data
      }
    },
    methods:{
      async create(){
        try{
           await this.$axios.$post(`/topics/${this.$route.params.id}/posts`,{
             body:this.body
           })
          this.$router.push('/topics')
        }catch (e) {
          this.errors = e.response.data.errors
        }
      },
      async deletePost(id){
        await  this.$axios.$delete(`/topics/${this.$route.params.id}/posts/${id}`)
        this.$router.push('/topics')
      }
    }
  }
</script>

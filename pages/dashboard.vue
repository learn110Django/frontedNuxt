<template>
  <div class="container col-md-6 mt-5">

<!--    <div class="text-danger" v-if="errors.title">{{ errors.title[0] }}</div>-->
<!--    <div class="text-danger" v-if="errors.body">{{ errors.body[0] }}</div>-->

    <hr>
    <h3>Create a new topic</h3>

    <form @submit.prevent="create">
      <div class="form-group">
        <label>Topic title</label>
        <input
          name="title"
          v-model="title"
          type="text" class="form-control" placeholder="Enter title" autofocus >
        <span class="text-danger" v-if="errors.title">{{ errors.title[0] }}</span>

      </div>

      <div class="form-group">
        <label>Body</label>
        <textarea
            name="body"
            v-model="body"
             class="form-control" rows="5"
             placeholder="Body comes here.."
             >
        </textarea>
        <span class="text-danger" v-if="errors.body">{{ errors.body[0] }}</span>
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>

  </div>

</template>

<script>
  export default {
        middleware:['auth'],
      data(){
          return{
            title:'',
            body:'',
            errors:{}
          }
      },
    methods:{
     async  create(){
         try{
            await  this.$axios.$post('/topics',{
               title:this.title,
              body:this.body
           })
           this.$router.push({
             path:this.$route.query.redirect || "/"
           })
         }catch (e) {
           this.errors = e.response.data.errors
         }
      }
    }
  }
</script>

<style scoped>
  .content{
     border-left: 10px solid white;
    padding: 0 10px 0 10px;
  }
</style>












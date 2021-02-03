export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet", href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"},
      {rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"}
    ],
    script:[
       {
         src:'https://code.jquery.com/jquery-3.2.1.slim.min.js',
         type:'text/javascript'
       },
       {
        src:'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
        type:'text/javascript'
      },
      {
        src:'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
        type:'text/javascript'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [

  ],


  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "./plugins/mixins/user.js",
    // "./plugins/axios.js",
    // "./plugins/mixins/validation.js"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

   // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  // axios: {
  //     baseURL:"http://127.0.0.1:8000/api"
  // },
  axios: {
    // baseURL : process.env.API_URL
    baseURL : process.env.API_URL || 'http://127.0.0.1:8000/api',
  },



  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth:{
    strategies: {
      local: {
        endpoints:{
          login: {
            url: "login",
            method: "post",
            propertyName: "meta.token"
          },

          user: {
            url: "user",
            method: "get",
            propertyName: "data"
          },
          logout: {
            url: "logout",
            method: "post"
          }
         }
      }
    }

  },




  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}

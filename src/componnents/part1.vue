  <template>
    <ul id="app1">
      <li v-for = "item in list" >
       {{ item.body }}
      </li>
    </ul>
  </template>

  <script>

  export default {
   data (){
     return {
       list:[]
     }
 		}
  }
  </script>

  <style lang='sass'>

  </style>

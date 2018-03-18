<template>
  
  <div class="list">
    <h1>Shopping List</h1>
    <form v-on:submit.prevent="addItem">
      <input placeholder="Item Name" type="text" v-model="text">
      <input placeholder="$0.00" type="number" step="0.01" v-model="price">
      <button type="submit">Add</button>
    </form>
    <div class="controls">
      <button v-on:click="showAll()">Show All</button>
      <button v-on:click="showActive()">Show List</button>
      <button v-on:click="showCompleted()">Show Cart</button>
      <button v-on:click="deleteCompleted()">Delete Cart Items From List</button>
    </div>
    <ul>
      <li v-for="item in filteredItems" draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)">
	<input type="checkbox" v-model="item.completed" v-on:click="completeItem(item)" /><label v-bind:class="{ completed: item.completed }"> {{ item.text }}</label><div class="price" style="text-align: center;">Price<br>${{ item.price }}</div> <button v-on:click="deleteItem(item)" class="delete">X</button>
      </li>
    </ul>
    
   <!-- <p id="output">Subtotal<br>$</p>-->
    <footer>
    <a href="https://github.com/cgatrell/CreativeLab4" target="_blank">GitHub</a>
  </footer>
  </div>

</template>

<script>
 var total = 0.00;
 export default {
   name: 'ShoppingList',
   data () {
     return {
       text: '',
       price: '',
       show: 'all',
       drag: {},
     }
   },
   computed: {
     items: function() {
       return this.$store.getters.items;
     },  
     activeItems: function() {
       return this.items.filter(function(item) {
	 return !item.completed;
       });
     },
     filteredItems: function() {
       if (this.show === 'active')
	 return this.items.filter(function(item) {
	   return !item.completed;
	 });
       if (this.show === 'completed')
	 return this.items.filter(function(item) {
	   return item.completed;
	 });
       return this.items;
     },
   },

   created: function() {
     this.getItems();
   },
   methods: {
     getItems: function() {
       this.$store.dispatch('getItems');
     },
     getTotal: function() {
       let result = items.map(price => item.price);
       let total = result.reduce();
       return total;
     },
     addItem: function() {
       this.$store.dispatch('addItem', {
         text: this.text,
	 price: this.price,
	 completed: false
       });
       this.text = '';
       this.price='';
       //getTotal();
     },
     completeItem: function(item) {
       this.$store.dispatch('updateItem',{
         id: item.id,
         text: item.text,
	 price: this.price,
         completed: !item.completed,
         orderChange: false,
       });
     },
     deleteItem: function(item) {
       this.$store.dispatch('deleteItem',{
         id: item.id
       });
     },
     showAll: function() {
       this.show = 'all';
     },
     showActive: function() {
       this.show = 'active';
     },
     showCompleted: function() {
       this.show = 'completed';
     },
     deleteCompleted: function() {
       this.items.forEach(item => {
	 if (item.completed)
	   this.deleteItem(item)
       });
     },
     dragItem: function(item) {
       this.drag = item;
     },
     dropItem: function(item) {
       this.$store.dispatch('updateItem',{
         id: this.drag.id,
         text: this.drag.text,
	 price: this.drag.price,
	 completed: this.drag.completed,
	 orderChange: true,
	 orderTarget: item.id
       });
     },
   }
 }
</script>

<style scoped>

.list {
     margin: auto;
     width: 50%;
}
body {
     background-color: teal;
}
 ul {
     list-style: none;
 }

 li {
     background: #f3f3f3;
     width: 500px;
     min-height: 30px;
     padding: 10px;
     margin-bottom: 10px;
     font-size: 1em;
     display: flex;
     align-items: center;
 }

 .delete {
     display: none;
     margin-left: auto;
 }

 li:hover .delete {
     display: block;
 }

 label {
     width: 400px;
 }

 .completed {
     text-decoration: line-through;
 }

.price {
     text-align: right;
     float: center;
}

 /* Form */

 input[type=checkbox] {
     transform: scale(1.5);
     margin-right: 10px;
 }

 input[type=text] {
     font-size: 1em;
 }

 button {
     font-family: 'Arvo';
     font-size: 1em;
 }
 .controls {
     margin-top: 20px;
 }
 footer {
   padding-top: 20px;
   padding-bottom: 20px;
   text-align: center;
}
</style>
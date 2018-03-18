<template>
<nav>
  <body>
    <div class="form">
      <form v-on:submit.prevent="addItem">
        <input placeholder="Item Name" type="text" v-model="text"><br>
	<input placeholder="$0.00" type="number" step="0.01" v-model="price"><br>
	<button type="submit">Add Ingredient To List</button>
      </form>
    </div>

    <h1>Beef Stroganoff</h1>

    <img src="/static/images/beefstrog.jpg">

    <div class = "recipe">
      <div class="ingredients">
	<h2>Ingredients</h2>
	<div class=test>
 	  <ul>
	    <li>1 1/2 pounds cubed round steak, cut into thin strips</li>
	    <li>All-purpose flour</li>
	    <li>2 tablespoons olive oil</li>
	    <li>2 tablespoons butter</li>
	    <li>1 medium onion, sliced</li>
	    <li>8 ounces fresh mushrooms, sliced</li>
	    <li>1 (10 3/4-ounce) can beef broth</li>
	    <li>1 (10 3/4-ounce) can cream of mushroom soup</li>
	    <li>Salt and black pepper</li>
	    <li>1 cup sour cream</li>
	    <li>Cooked egg noodles</li>
	    <li>1 cup salt</li>
	    <li>1/4 cup black pepper</li>
	    <li>1/4 cup garlic powder</li>
	  </ul>
	</div>
      </div>

      <div>
	<h2>Directions</h2>
	<p>Mix the salt, black pepper, and garlic powder together to create House Seasoning. Sprinkle the steak strips with House Seasoning, and then dust with flour. In a large skillet, quickly brown them on both sides in the olive oil and butter. Remove the steak from the pan. Add the onion slices and mushrooms to the pan drippings. Saute for a few minutes, until the onion is tender. Sprinkle with 1 teaspoon flour. Put the steak back into the pan with the onion and mushrooms. Add the mushroom soup and beef broth. Cook over low heat for about 30 minutes, covered. Adjust seasoning to taste, adding salt and pepper, as needed. Stir in the sour cream the last few minutes, right before you serve. Serve over cooked noodles.</p>
      </div>
    </div>

  </body>
  <footer>
    <a href="https://github.com/cgatrell/food" target="_blank">https://github.com/cgatrell/food</a>
  </footer>

</nav>
</template>

<script>
 export default {
   name: 'Todo',
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
     addItem: function() {
       this.$store.dispatch('addItem', {
         text: this.text,
	 price: this.price,
	 completed: false
       });
       this.text = '';
       this.price ='';
     },
     completeItem: function(item) {
       this.$store.dispatch('updateItem',{
         id: item.id,
         text: item.text,
	 price: item.price,
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

.form {
      position: fixed;
      align: left;
      margin-left: -150px;
      margin-top: -80px;
}

.ingredients {
	float: left;
}

.test  {
      float: left;
      align: left;
      margin: auto;
      text-align: left;
}

nav a {
	font-family: helvetica;
	padding: 14px 20px;
	color: black;
	text-decoration: none;
}

.recipe {
	display: grid;
	grid-template-columns: 1fr 2fr;
}

h2 {
 	text-align: center;
	font-family: 'Kaushan Script', cursive;
}

h1 {
	text-align: center;
}

img {
	display: block;
        margin-left: auto;
        margin-right: auto;
}

body {
	margin: 40px;
}

div {
	padding: 20px;
}

footer {
	padding-top: 20px;
	text-align: center;
	padding-bottom: 20px;
}

ul {
   text-align: left;
}
</style>
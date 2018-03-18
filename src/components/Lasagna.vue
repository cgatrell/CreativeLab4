<template>
  <div class="Lasagna">
    <body>
      <div class="form">
        <form v-on:submit.prevent="addItem">
	  <input placeholder="Item Name" type="text" v-model="text"><br>
	   <input placeholder="$0.00" type="number" step="0.01" v-model="price"><br>
	  <button type="submit">Add Ingredient To List</button>
        </form>
      </div>	
      <h1>Lasagna</h1>
      <img src="static/images/lasagna.jpg">

      <div class = "recipe">
	<div class="ingredients">
          <h2>Ingredients</h2>
          <ul><div class="test">
	    <li>9 lasagna noodles</li>
	    <li>1-1/4 pounds bulk Italian sausage</li>
	    <li>3/4 pound ground beef</li>
	    <li>1 medium onion, diced </li>
	    <li>3 garlic cloves, minced </li>
	    <li>2 cans (one 28 ounces, one 15 ounces) crushed tomatoes </li>
	    <li>2 cans (6 ounces each) tomato paste </li>
	    <li>2/3 cup water </li>
	    <li>2 to 3 tablespoons sugar </li>
	    <li>3 tablespoons plus 1/4 cup minced fresh parsley, divided </li>
	    <li>2 teaspoons dried basil </li>
	    <li>3/4 teaspoon fennel seed </li>
	    <li>3/4 teaspoon salt, divided </li>
	    <li>1/4 teaspoon coarsely ground pepper </li>
	    <li>1 large egg, lightly beaten </li>
	    <li>1 carton (15 ounces) ricotta cheese </li>
	    <li>4 cups shredded part-skim mozzarella cheese </li>
	    <li>3/4 cup grated Parmesan cheese </li>
	  </div></ul>
	</div>

	<div>
          <h2>Directions</h2>
	  <p> Cook noodles according to package directions; drain. Meanwhile, in a Dutch oven, cook sausage, beef and onion over medium heat 8-10 minutes or until meat is no longer pink, breaking up meat into crumbles. Add garlic; cook 1 minute. Drain.
Stir in tomatoes, tomato paste, water, sugar, 3 tablespoons parsley, basil, fennel, 1/2 teaspoon salt and pepper; bring to a boil. Reduce heat; simmer, uncovered, 30 minutes, stirring occasionally.
In a small bowl, mix egg, ricotta cheese, and remaining parsley and salt.
Preheat oven to 375°. Spread 2 cups meat sauce into an ungreased 13x9-in. baking dish. Layer with three noodles and a third of the ricotta mixture. Sprinkle with 1 cup mozzarella cheese and 2 tablespoons Parmesan cheese. Repeat layers twice. Top with remaining meat sauce and cheeses (dish will be full).
Bake, covered, 25 minutes. Bake, uncovered, 25 minutes longer or until bubbly. Let stand 15 minutes before serving. Yield: 12 servings. .</p>
	</div>
      </div>
		
    </body>

    <footer>
      <a href="https://github.com/cgatrell/food" target="_blank">https://github.com/cgatrell/food</a>
    </footer>

  </div>
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
       this.price = '';
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
      margin-left: -170px;
      margin-top: -100px;
}

.ingredients {
	float: left;
}

nav a {
	font-family: helvetica;
	padding: 14px 20px;
	background-color: grey;
	color: black;
	text-decoration: none;
}

nav li a:hover {
	background-color: dimgrey;
}

.active {
	background-color: royalblue;
}

.test  {
      float: left;
      align: left;
      margin: auto;
      text-align: left;
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

</style>
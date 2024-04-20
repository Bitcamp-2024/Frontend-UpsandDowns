<script setup>

</script>

<template>
    <header>
        <h1>About us</h1>
    </header>
    <div class="paracontainer">
        <p class="para">Welcome to our world! We're a dynamic squad of Machine Learning (ML) and Full Stack Development trailblazers. Our passion lies in crafting cutting-edge finance applications designed to empower all users. We're here to revolutionize the way you interact with financial technology, making complexity simple and accessibility paramount. Join us on our journey to redefine the future of finance!</p>
        <div class="githublinks">Githubs: 
            <a href="https://github.com/DurjaMan27">github/DurjaMan27</a>,
            <a href="https://github.com/qwertydelle">github/qwertydelle</a>,
            <a href="https://github.com/NerdyGamer05">github/NerdyGamer05</a>,
            <a href="https://github.com/Programlog">github/Programlog</a>.
        </div>
    </div>
</template>

<style scoped>
p, .githublinks {
    margin: 30px;
}

.para {
    font-weight: bold;
    font-size: 30px;
}

h1 {
  /* Apply gradient to text */
  background: linear-gradient(135deg, #7c3aed, #5d90e8);
  /* Set text color to transparent to show the gradient */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Adjust font properties */
  font-size: 60px; /* Adjust the font size */
  font-weight: bold; /* Make the text bold */
  font-family: Arial, sans-serif; /* Specify font family */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add text shadow for definition */
  margin-left: 30px;

}
</style>
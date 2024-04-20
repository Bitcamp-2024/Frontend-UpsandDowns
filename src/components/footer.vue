<template>
    <div id="footer">
        <p id="start">2024 Bitcamp Varun R, Varun D, Jai P, and Declan A</p>
        <p id="end">Made with <span id=heart>❤️</span> in Maryland</p>
    </div>
</template>

<style scoped>
#start {
    margin: 40px;
}

#heart {
    animation-name: beat;
    animation-duration: 0.5s;
    color: red;
}


#end {
    margin-bottom: 40px;
}

#footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #7c3aed;
    border-image: linear-gradient(to right, transparent, #7c3aed, transparent);
    border-image-slice: 1;
    background-color: #36393e;
}

#footer > p {
    font-weight: bold;
    color: white;
}

</style>;
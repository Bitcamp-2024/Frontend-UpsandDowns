<template>
    <div id="footer">
        <p id="start">2024 Bitcamp Varun R, Varun K, Jai P, and Declan A</p>
        <p id="end">Made with <span id="heart">❤️</span> in Maryland</p>
    </div>
</template>

<style scoped>
#footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #7c3aed;
    border-image: linear-gradient(to right, transparent, #7c3aed, transparent);
    border-image-slice: 1;
    background-color: #36393e;
    animation: slide-up 0.5s forwards; /* Slide up animation */
    opacity: 0; /* Initially hide the footer */
}

@keyframes slide-up {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

#footer > p {
    font-weight: bold;
    color: white;
}

#start {
    margin: 40px; /* Adjust the margin as needed */
}

#heart {
    animation-name: beat;
    animation-duration: 0.5s;
    color: red;
}

#end {
    margin-bottom: 20px; /* Adjust the margin as needed */
}

@keyframes beat {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}
</style>

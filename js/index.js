window.onload = () => {
    document.querySelector('.start-game').addEventListener("click", ()=>{
        document.querySelector('.intro').classList.toggle('hidden')
        document.querySelector('#myCanvas').classList.toggle('hidden')
        game.init();
    })
};
const app = {

    newTextColor: 'blue',

    initialize: function() {

        document.getElementById('headtext').addEventListener('click', () => {
            app.changeTextColor()
        });
        console.log('help')
    },

    changeTextColor: function() {
        document.body.style.color = this.newTextColor;
    }
}
const app = {

    newTextColor: 'blue',
    oldTextColor: 'white',

    initialize: function() {

        document.getElementById('headtext').addEventListener('click', () => {
            app.changeTextColor()
        });

        // document.getElementsById('a').addEventListener('hover', () => {
        //     app.changeTextColor()
        // });
    },

    changeTextColor: function() {
        document.body.style.color = this.newTextColor;
    },

    changeText2Color: function(event) {
        event.style.color = this.newTextColor;
    },

    changeTextBack: function(event) {
        console.log(event)
        event.style.color = this.oldTextColor;
    }
}


// const app = {
//     initialize: function() {}

// }

// $(document).ready(function() {
//     $("figure").mouseover(function() {
//         $(this).addClass("overlay", "text");
//     });
//     $("figure").mouseleave(function() {
//         $(this).removeClass("overlay", "text");
//     });
// });
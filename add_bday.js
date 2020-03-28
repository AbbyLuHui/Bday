$(document).ready(function(){
    $('#submit').click(function(){
        var name = $('#name').val()
        var bday = $('#bdy').val()
        console.log(name, bday)
    })
    $('#back').click(function(){
        window.location.href = 'popup.html'
    })

    
})
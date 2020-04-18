$(document).ready(function(){
    $('#submit').click(function(e){
        e.preventDefault()
        var name = $('#name').val()
        var date = new Date($('#bday').val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        // var bday = $('#bday').val()
        console.log(name, date, day,month, year)
    })
    $('#back').click(function(e){
        e.preventDefault()
        window.location.href = 'popup.html'
    })
})

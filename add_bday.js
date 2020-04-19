
$(document).ready(function(){
    $('#submit').click(function(e){
        e.preventDefault()
        $('.alert').remove()
        var name = $('#name').val()
        var date = new Date($('#bday').val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        console.log(name, date, day,month, year)

        var curr_year_bday = month+' / '+day
        var calendar_year_bday = year+'-'+month+'-'+day
        chrome.storage.sync.get(function(data){
          if (!(name in data.birthday)){
            createBirthdayEvent(name, calendar_year_bday, curr_year_bday);
          }
        })
       
        $('#back').before('<div class="alert alert-success" role="alert">Successfully stored! </div>')
        $('.alert').append('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
        $('.close').click(function(event){
            event.preventDefault()
            $('.alert').remove()
        })
        $('#name').val('').focus()
        $('#bday').val('')
    })
    $('#back').click(function(e){
        e.preventDefault()
        window.location.href = 'popup.html'
    })
})

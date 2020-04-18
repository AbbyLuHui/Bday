
$(document).ready(function(){
    $('#submit').click(function(){
        var name = $('#name').val()
        var bday = $('#bday').val()
        var year = new Date();
        var month = bday.split('-')[1]
        var day = bday.split('-')[2]
        var curr_year_bday = month+' / '+day
        var calendar_year_bday = year.getFullYear()+'-'+month+'-'+day
        console.log(name, bday);
        chrome.storage.sync.get(function(data){
          if (!(name in data.birthday)){
            createBirthdayEvent();
          }
        })
    })
    $('#back').click(function(){
        window.location.href = 'popup.html'
    })
})

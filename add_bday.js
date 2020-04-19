
$(document).ready(function(){
    $('#submit').click(function(e){
        e.preventDefault()
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
    })
    $('#back').click(function(e){
        e.preventDefault()
        window.location.href = 'popup.html'
    })
})

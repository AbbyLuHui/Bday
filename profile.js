function onClickClose(e) {
  console.log("hererrrrrrr");
  $(this.parentElement).hide();
  $(this).hide();
  e.preventDefault();
}

$(document).ready(function() {
  $(".close").click(function(e){
    onClickClose(e)
  });
});


(function(W){
 var D,form,bts,ipt;
 const ph_const = 0;
 const msg_const = 1;
 function init(){
  D=W.document;
  previous=[];
  msgPrevious = "";

  form=D.getElementsByTagName('form')[0];
  name = form.getElementsByTagName('h4');
  bts=form.getElementsByTagName('button');
  labels=form.getElementsByTagName('label');
  ipt=form.getElementsByTagName('input');
  msgBox = D.getElementById('msg');

  form.addEventListener('submit',save,false);
  bts[1].addEventListener('click',cancel,false);
  bts[2].addEventListener('click',edit,false);
  bts[3].addEventListener('click', back, false);
  bts[5].addEventListener('click', del, false)
  chrome.storage.local.get("current_friend", function(user){
    var prof_name = D.getElementById("profile_name");
    prof_name.innerHTML = user.current_friend;
    chrome.storage.local.get("birthday", function(data){
      ipt[ph_const].value= data.birthday[[user.current_friend]].phone;
      msgBox.value = data.birthday[[user.current_friend]].message;
      const giftdescription = data.birthday[[user.current_friend]].giftdescription;
      const gifturl = data.birthday[[user.current_friend]].gifturl;
      for (var index = 0; index<giftdescription.length; index++){
        var node = document.createElement('a');
        node.className = "list-group-item list-group-item-action";
        var linkedText = document.createTextNode(giftdescription[index]);

        var span = document.createElement('SPAN');
        span.className = "close";
        var x = document.createTextNode("x");
        span.appendChild(x);

        node.appendChild(linkedText);
        node.appendChild(span);
        node.href = gifturl[index];
        node.target="_blank";
        var giftlist = document.getElementById("giftlist");
        giftlist.appendChild(node);

        span.addEventListener("click", onClickClose);
        //node ex: <a href="https://www.facebook.com/" target="_blank" class="list-group-item list-group-item-action">FB page<span class="close">&times;</span></a>
      }
    })
  })

}

 function back(e){
   window.location.href = "popup.html";
 }
 function del(e){
   chrome.identity.getAuthToken({ 'interactive': true }, function(token) {

     const headers = new Headers({
       'Authorization' : 'Bearer ' + token,
       'Content-Type': 'application/json'
     })
     chrome.storage.local.get("current_friend", function(user){
       chrome.storage.local.get("birthday", function(data){
         var event_id = data.birthday[user.current_friend].id;
         const deleteParams = {
           headers: headers,
           method: "DELETE",
         };
        console.log(event_id);
        fetch ('https://www.googleapis.com/calendar/v3/calendars/primary/events/' + event_id, deleteParams)
        .then(function(d) {
          delete data.birthday[user.current_friend];
          chrome.storage.local.set(data);
          window.location.href = "popup.html";
        })
       })
     })
   })
 }
 function save(e){
  e.preventDefault();
  form.classList.remove('invert');
  var l=ipt.length;
  console.log(ipt);
  while(l--){
   ipt[l].readOnly=true;
  };
  msgBox.readOnly=true;
  chrome.storage.local.get("current_friend", function(user){
    chrome.storage.local.get("birthday", function(data){
      var modified = data;
      modified.birthday[[user.current_friend]].phone = ipt[ph_const].value;
      modified.birthday[[user.current_friend]].message = msgBox.value;
      chrome.storage.local.set(modified);
    })
  })

  previous=[];
  //send your info here
 }
 function edit(e){
  e.preventDefault();
  form.classList.add('invert');
  var l=ipt.length;
  while(l--){
   previous[l]=ipt[l].value;
   ipt[l].readOnly=false;
  }
  msgPrevious=msgBox.value;
  msgBox.readOnly=false;
 }
 function cancel(e){
  form.classList.remove('invert');
  e.preventDefault();
  var l=ipt.length;
  while(l--){
   ipt[l].value=previous[l];
   ipt[l].readOnly=true;
  }
  msgBox.value=msgPrevious;
  msgBox.readOnly=true;
 }
 W.addEventListener('load',init,false);
})(window)

let addGift = document.getElementById('gift');
addGift.onclick = function(element){
  window.location.href = "addgift.html";
}

let giftList = document.getElementById("giftlist");

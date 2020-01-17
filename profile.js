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
  chrome.storage.local.get("current_friend", function(user){
    var prof_name = D.getElementById("profile_name");
    prof_name.innerHTML = user.current_friend;
    chrome.storage.local.get("birthday", function(data){
      ipt[ph_const].value= data.birthday[[user.current_friend]].phone;
      msgBox.value = data.birthday[[user.current_friend]].message;
    })
  })

}
 function back(e){
   window.location.href = "popup.html";
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

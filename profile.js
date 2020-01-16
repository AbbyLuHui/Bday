(function(W){
 var D,form,bts,ipt;
 function init(){
  D=W.document,previous=[];
  console.log(D);
  form=D.getElementsByTagName('form')[0];
  bts=form.getElementsByTagName('button');
  labels=form.getElementsByTagName('label');
  ipt=form.getElementsByTagName('input');
  form.addEventListener('submit',save,false);
  bts[1].addEventListener('click',cancel,false);
  bts[2].addEventListener('click',edit,false);
  bts[3].addEventListener('click', back, false);
  chrome.storage.local.get("current_friend", function(user){
    console.log(user);
    labels[0].innerHTML = user.current_friend;
    chrome.storage.local.get("birthday", function(data){
      console.log(data.birthday[[user.current_friend]]);
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
  while(l--){
   ipt[l].readOnly=true;
  };
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
 }
 function cancel(e){
  form.classList.remove('invert');
  e.preventDefault();
  var l=ipt.length;
  while(l--){
   ipt[l].value=previous[l];
   ipt[l].readOnly=true;
  }
 }
 W.addEventListener('load',init,false);
})(window)

let addGift = document.getElementById('addGift');
addGift.onclick = function(element){
  window.location.href = "addgift.html";
}

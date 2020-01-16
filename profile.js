(function(W){
 var D,form,bts,ipt;
 const ph = 1;
 const msg = 2;
 function init(){
  D=W.document,previous=[];
  form=D.getElementsByTagName('form')[0];
  bts=form.getElementsByTagName('button');
  labels=form.getElementsByTagName('label');
  ipt=form.getElementsByTagName('input');

  form.addEventListener('submit',save,false);
  bts[1].addEventListener('click',cancel,false);
  bts[2].addEventListener('click',edit,false);
  bts[3].addEventListener('click', back, false);
  chrome.storage.local.get("current_friend", function(user){
    //labels[0].appendChild(document.createTextNode(user.current_friend));
    ipt[0].value = user.current_friend;
    chrome.storage.local.get("birthday", function(data){
      ipt[ph].value= data.birthday[[user.current_friend]][phone];
      ipt[msg].value = data.birthday[[user.current_friend]][message];
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

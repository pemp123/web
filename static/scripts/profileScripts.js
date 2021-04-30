document.querySelector('input[id="canel_change_e-mail"]').onclick = function() {
this.parentNode.classList.remove("visible");
this.parentNode.classList.add("invisible");
var temp = document.querySelector('div[id="e-mail_show"]');
temp.classList.remove("invisible");
temp.classList.add("visible");
}

document.querySelector('input[id="start_change_e-mail"]').onclick = function() {
this.parentNode.classList.remove("visible");
this.parentNode.classList.add("invisible");
var temp = document.querySelector('form[id="ch_e-mail_form"]');
temp.classList.remove("invisible");
temp.classList.add("visible");
}

async function change_pass()
{
  var pk = "111"
  let url = "change_pass"
  
  let response = await fetch(url);
  
  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.text();
    alert(json);
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

async function change_email()
{
  alert("ddd");
  let url = "change_email";
  let blob = await new FormData(this.parentNode)
  let response = await fetch(url,
  {
    method: 'POST',
    body: blob
  });

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.text();
    alert(json);
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}

var elem = document.getElementById("change_pass");
var ch_email = document.getElementById("change_e-mail");
elem.addEventListener("click", change_pass);
ch_email.addEventListener("click", change_email);
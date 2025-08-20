function confirmSubmit() {
  const forms = document.forms;
  forms[0].onsubmit = function(){
    const name = forms[0].name.value;
    if (!(confirm(`${name}, are you sure you want to submit?`))) {
      alert("Submission canceled");
      return false;
    }
  };
}

window.onload = confirmSubmit;
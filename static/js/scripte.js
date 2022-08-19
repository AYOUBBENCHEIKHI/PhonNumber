const { Alert } = require("bootstrap")

function deleteTelephone(){
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')
    var result = confirm("do yo want to delete this Phone number ?");
    if(result)  {
        axios.delete('/telephones/delete/'+id)
        .then((res)=>{
           // console.log(res.data)
            //alert('phone number was deleted ')
            window.location.href='/telephones'
        })
        .catch((err)=>{
            console.log(err)
        })
    } else {
        //alert("Phone number not deleted..");
    }
   
}
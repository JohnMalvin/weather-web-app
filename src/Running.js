import './index.css'

function running() {
    document.getElementById("search_input").addEventListener("input", function(){
        document.getElementById("search_list").style.display = "block";
        document.getElementById("search_input").style.borderBottomLeftRadius = "0px";
        document.getElementById("search_input").style.borderBottomRightRadius = "0px";
    })

}
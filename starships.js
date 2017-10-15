document.getElementById("compare").addEventListener('click',function(){
   run(gen).catch(function(err){
       alert(err.message);
   })
})

function run(genFunc){
    const genObj=genFunc();

    function iterate(iteration){
        if(iteration.done){
            return Promise.resolve(iteration.value);
        }
        return Promise.resolve(iteration.value).then(x=>iterate(genObj.next(x))).catch(x=>genObj.throw(x))
    }

    try{
        return iterate(genObj.next());
    }catch (ex){
        return Promise.reject(ex);
    }
}
function *gen(){
    var compare1=document.getElementById("compare1");
    var compare2=document.getElementById("compare2");

    var starShipName1= yield fetch("http://swapi.co/api/starships/"+compare1.options[compare1.selectedIndex].value);
    var starShip1=yield starShipName1.json();
    var starShipName2= yield fetch("http://swapi.co/api/starships/"+compare2.options[compare2.selectedIndex].value);
    var starShip2=yield starShipName2.json();


    document.getElementById("name1").innerHTML=starShip1.name;
    document.getElementById("name2").innerHTML=starShip2.name;
    document.getElementById("cost1").innerHTML=starShip1.cost_in_credits;
    document.getElementById("cost2").innerHTML=starShip2.cost_in_credits;
    document.getElementById("speed1").innerHTML=starShip1.max_atmosphering_speed;
    document.getElementById("speed2").innerHTML=starShip2.max_atmosphering_speed;
    document.getElementById("cargo1").innerHTML=starShip1.cargo_capacity;
    document.getElementById("cargo2").innerHTML=starShip2.cargo_capacity;
    document.getElementById("passenger1").innerHTML=starShip1.passengers;
    document.getElementById("passenger2").innerHTML=starShip2.passengers;
    comparision();
}

function comparision(){
    for (var i = 0; i < document.getElementsByTagName("TD").length; i++){
    document.getElementsByTagName("TD")[i].style.backgroundColor = "white"; }
    if (parseInt(document.getElementById("cost1").innerHTML)>parseInt(document.getElementById("cost2").innerHTML)){
        document.getElementById("cost1").style="background-color:red";
    }
    else if(parseInt(document.getElementById("cost1").innerHTML)<parseInt(document.getElementById("cost2").innerHTML)){
        document.getElementById("cost2").style="background-color:red";
    }
    if (parseInt(document.getElementById("speed1").innerHTML)>parseInt(document.getElementById("speed2").innerHTML)){
        document.getElementById("speed1").style="background-color:red";
    }
    else if(parseInt(document.getElementById("speed1").innerHTML)<parseInt(document.getElementById("speed2").innerHTML)){
        document.getElementById("speed2").style="background-color:red";
    }
    if (parseInt(document.getElementById("cargo1").innerHTML)>parseInt(document.getElementById("cargo2").innerHTML)){
        document.getElementById("cargo1").style="background-color:red";
    }
    else if (parseInt(document.getElementById("cargo1").innerHTML)<parseInt(document.getElementById("cargo2").innerHTML)){
        document.getElementById("cargo2").style="background-color:red";
    }
    if (parseInt(document.getElementById("passenger1").innerHTML)>parseInt(document.getElementById("passenger2").innerHTML)){
        document.getElementById("passenger1").style="background-color:red";
    }
    else if(parseInt(document.getElementById("passenger1").innerHTML)<parseInt(document.getElementById("passenger2").innerHTML)){
        document.getElementById("passenger2").style="background-color:red"; 
    }
}
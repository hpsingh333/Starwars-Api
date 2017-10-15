document.getElementById("search").addEventListener('click',function(){
    run(gen).catch(function(err){
        alert(err.message);
    });
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
    if(document.getElementById("input").value>7 || document.getElementById("input").value<1){
        throw new Error("Invalid input- Enter a number between 1 and 7.")
    }

    var filmName= yield fetch("http://swapi.co/api/films/"+document.getElementById("input").value);
    var film=yield filmName.json();

    var characters=film.characters;
    var characterString="Characters: <br>";
    for(let i=0; i<characters.length;i++){
        var tempCharacterResponse=yield fetch(characters[i]);
        var tempCharacter=yield tempCharacterResponse.json();
        characterString+=tempCharacter.name+"<br>"
    }

    document.getElementById("film").innerHTML=film.title;
    document.getElementById("characters").innerHTML=characterString;
}
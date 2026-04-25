function calculateGPA(){
    // Get the input values for each subject
    const math = document.getElementById('math').value;
    const science = document.getElementById('science').value;
    const english = document.getElementById('english').value;
    const history = document.getElementById('history').value;
    const elective1 = document.getElementById('elective1').value;
    const elective2 = document.getElementById('elective2').value;

    const math_creditHours = document.getElementById('math_creditHours').value;
    const science_creditHours = document.getElementById('science_creditHours').value;
    const english_creditHours = document.getElementById('english_creditHours').value;
    const history_creditHours = document.getElementById('history_creditHours').value;
    const elective1_creditHours = document.getElementById('elective1_creditHours').value;
    const elective2_creditHours = document.getElementById('elective2_creditHours').value;

    const statusDisplay = document.getElementById('statusDisplay');
    const GPAOutput = document.getElementById('GPAOutput');
    
    GPAOutput.innerText = "";

    const btn = document.querySelector('button');
    btn.disabled=true;
    let dotCount  = 0;


    const dotTimer = setInterval(() => {
            dotCount = (dotCount + 1) % 4 //cycle through 0,1,2,3
            statusDisplay.innerText = "Calculating" + ".".repeat(dotCount);//repeat() 这个真的巨方便！！
    },500)

    statusDisplay.classList.add('calculating_mode');

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            math:math,
            science:science,
            english:english,
            history:history,
            elective1:elective1,
            elective2:elective2,
            math_creditHours:math_creditHours,
            science_creditHours:science_creditHours,
            english_creditHours:english_creditHours,
            history_creditHours:history_creditHours,
            elective1_creditHours:elective1_creditHours,
            elective2_creditHours:elective2_creditHours
        })
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    ).then( data =>{

        setTimeout(() => {
            clearInterval(dotTimer);
            statusDisplay.innerText = "";
            GPAOutput.innerText = data.answer;
            btn.disabled = false;
            return data;
        }, 3000);

    }
    ).catch(error =>{
        setTimeout(() => {  
        statusDisplay.innerText = "Error!!";
        console.error(error);
        }, 3000);
        btn.disabled = false;
    });
}
    
function clearInput(){
    document.getElementById('math').value = '';
    document.getElementById('science').value = '';
    document.getElementById('english').value = '';
    document.getElementById('history').value = '';
    document.getElementById('elective1'),value = '';
    document.getElementById('elective2'),value = '';

    document.getElementById('math_creditHours').value = '';
    document.getElementById('science_creditHours').value = '';
    document.getElementById('english_creditHours').value = '';
    document.getElementById('history_creditHours').value = '';
    document.getElementById('elective1_creditHours').value = '';
    document.getElementById('elective2_creditHours').value = '';

    document.getElementById("GPAOutput").innerText = "";
    document.getElementById("statusDisplay").innerText = "";

}

var testScore = {
    name: "",
    math: 0,
    physics: 0,
    chemistry: 0,
    avg: 0
};
var i = 1;
/* This variable is incremented by 1 every time the user clicks the "Submit" button. Display the "No" column, and the position of rows when added to the table 
 */

// Show a table after submit
function score_table() {
    document.getElementById("divTable").style.display = "block";

    // Gathering the data after submit
    testScore.name = document.getElementById("name").value;
    testScore.math = document.getElementById("math").value;
    testScore.physics = document.getElementById("physics").value;
    testScore.chemistry = document.getElementById("chemical").value;
    testScore.avg = (parseFloat(testScore.math) + parseFloat(testScore.physics) + parseFloat(testScore.chemistry)) / 3;
    document.getElementById("name").value = "";
    document.getElementById("math").value = "";
    document.getElementById("physics").value = "";
    document.getElementById("chemical").value = "";

    // Insert row
    var table = document.getElementById("tableScore");
    var row = table.insertRow(i);
    var number = row.insertCell(0);
    var name = row.insertCell(1);
    var math = row.insertCell(2);
    var physics = row.insertCell(3);
    var chemistry = row.insertCell(4);
    var avg = row.insertCell(5);

    number.innerHTML = i;
    name.innerHTML = testScore.name;
    math.innerHTML = testScore.math;
    physics.innerHTML = testScore.physics;
    chemistry.innerHTML = testScore.chemistry;
    avg.innerHTML = testScore.avg;
    i++;
    /** I need help, How to calculate the average score and if the average 
    score is >= 8 then hightlight every text in that row into red
     */
}

function showAvg() {
    document.getElementById("tableScore").querySelector("th:nth-child(6)").style.display = "block";

    var colAvg = document.getElementById("tableScore").querySelectorAll("td:nth-child(6n)");
    for (var i = 0; i < colAvg.length; i++) {
        colAvg[i].style.display = "block";
    }
}

function showBest() {
    var colAvg = document.getElementById("tableScore").querySelectorAll("td:nth-child(6n)");
    var rowAvg = document.getElementById("tableScore").querySelectorAll("tr:nth-child(1n)");

    for (var i = 0; i < colAvg.length; i++) {
        var avg = parseFloat(colAvg[i].innerText);
        if (avg >= 8) {
            rowAvg[i + 1].style.background = "red";
        } else { }
    }
}
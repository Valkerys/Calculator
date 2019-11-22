var config = {
apiKey: 'AIzaSyCFYB7fU5x_j0qG1sCwZ2caL1kQQ1JHNTU',
authDomain: 'calculator-53ab0.firebaseapp.com',
projectId: 'calculator-53ab0'
}

firebase.initializeApp(config);

var db = firebase.firestore();

function renderCalc(doc) {
    let li = document.createElement('li');
    let calculation = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    calculation.textContent = doc.data().calculation;

    li.appendChild(calculation);
    calculation.appendChild(document.createElement("br"));

    document.querySelector('#calc-list').appendChild(calculation);
} 

function callDb() {
    db.collection("calcualtions").orderBy("timestamp", "desc").limit(10).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            renderCalc(doc);
        });
    });
}

function addCalculation() {
    var data = document.getElementById("solution").innerHTML;
    db.collection("calcualtions").add({
        calculation: data,
        timestamp: Date.now()
    })
    .then(function(docRef) {
        console.log("Calculation as been added. ID is: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding calcualtion: ", error);
    });
}

function onLoadCall() {
    callDb();
}

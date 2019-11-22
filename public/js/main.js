 var config = {
    apiKey: 'AIzaSyCFYB7fU5x_j0qG1sCwZ2caL1kQQ1JHNTU',
    authDomain: 'calculator-53ab0.firebaseapp.com',
    projectId: 'calculator-53ab0'
 }

 firebase.initializeApp(config);

 var db = firebase.firestore();

function callDb() {
    db.collection("calcualtions").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
}

function addCalculation() {
    var data = document.getElementById("solution").innerHTML;
    db.collection("calcualtions").add({
        calculation: data
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

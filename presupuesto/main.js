    ///inicializamos Firebase
  var config = {
    apiKey: "AIzaSyD_VYecpQS0fYl1vl2EdKFxVoueAanB7ts",
    authDomain: "presupuesto-65d36.firebaseapp.com",
    projectId: "presupuesto-65d36",
    storageBucket: "presupuesto-65d36.appspot.com",
    messagingSenderId: "74665270390",
    appId: "1:74665270390:web:c0cd3e73f98ca9b6d3d357",
    measurementId: "G-H2BZYL81C7"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

var x2,x3;

var db = firebase.firestore();
LoadHistory();
function AddPresupuesto(type, amount){
    db.collection("presupuesto").add({
        tipo: type,
        monto: amount,
        fecha: new Date().getTime()
    })
    .then(function(docRef){
        //Imorimimos por consola si se guardo correctamente, y que nos muestre su ID de registro
        console.log("El documento ha sido creado corectamente su ID es : ",docRef.id);
        //Invocamos al metodo Limpoiar caja de texto
        //LimpiarCajasDeTextos();
        LoadHistory();
    })
    .catch(function (error) {
    //Imprimimo por consola si hay un error y que nos muestre el porque
    console.error("Error al crear el documento: ", error); 
    });
}

// añadimos los valores a frirebase de formulario de ingreso
document.getElementById("form1").addEventListener("submit", (e)=>{

    e.preventDefault();
    var monto = document.getElementById("ingresosFirebase").value;
    var ingreso={
        ingreso: monto
    };
    firebase.database().ref("PresupuestoAPP/Ingresos").set(ingreso);
    AddPresupuesto("Ingreso", monto);
    document.getElementById("ingresosFirebase").value="";
});
// añadimos los valores a frirebase de formulario de ingreso
document.getElementById("form2").addEventListener("submit", (e)=>{

    e.preventDefault();
    var monto = document.getElementById("egresosFirebase").value;
    var egresos={
        egresos: monto
    };  
    firebase.database().ref("PresupuestoAPP/Egresos").set(egresos);
    AddPresupuesto("Egreso", monto);
    document.getElementById("egresosFirebase").value="";
});


//Leamos valores de Firebase en Ingreso y egresos
function read(){
    if(x2 != 0){
        firebase.database().ref("PresupuestoAPP/Ingresos").child("ingreso").on("value", function(value){
            document.getElementById("ingresosFirebase").innerHTML=`${value.val()}`;
            x2 = value.val();
            document.getElementById("chart").innerHTML=`<canvas id="myChart"></canvas>`;
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {labels: ["Presupuesto","Egresos"],
                    datasets: [{
                        label: '# of Votes',
                        data: [x2,x3],
                        backgroundColor: 
                        ['rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: 
                        ['rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth:1
                    }]
                },
                option:{
                    scales:{
                        y:{
                            beginAtZero: true
                        }
                    }
                }
            
            });
            document.querySelector('#ingresos').innerHTML=`${x2}`;
            document.getElementById('total').innerHTML=`${x2-x3}`;
        });
        });

    }


    firebase.database().ref("PresupuestoAPP/Egresos").child("egresos").on("value", function(value){
        document.getElementById("egresosFirebase").innerHTML=`${value.val()}`;
        x3 = value.val();
        document.getElementById("chart").innerHTML=`<canvas id="myChart"></canvas>`;
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {labels: ["Presupuesto","Egresos"],
                datasets: [{
                    label: '# of Votes',
                    data: [x2,x3],
                    backgroundColor: 
                    ['rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: 
                    ['rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth:1
                }]
            },
            option:{
                scales:{
                    y:{
                        beginAtZero: true
                    }
                }
            }

    

        
        });
           
       
        document.querySelector('#egresos').innerHTML=`${x3}`;
        document.getElementById('total').innerHTML=`${x2-x3}`;
    });
    

}


function LoadHistory(){
    db.collection("presupuesto").onSnapshot((querySnapshot)=>{
        var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        var index = 1;
        tableRef.innerHTML = "";
        querySnapshot.forEach((doc)=>{
            var data = doc.data();
                tableRef.insertRow().innerHTML = 
                "<th scope='row'>" + (index++) + "</th>" + 
                "<td>" +data.tipo+ "</td>"+
                "<td>" +data.monto+ "</td>";
        });
    });
}
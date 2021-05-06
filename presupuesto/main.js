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
// añadimos los valores a frirebase de formulario de ingreso
document.getElementById("form1").addEventListener("submit", (e)=>{

    e.preventDefault();
    var ingreso={
        ingreso: document.getElementById("ingresosFirebase").value
    };
    firebase.database().ref("PresupuestoAPP/Ingresos").set(ingreso);
    document.getElementById("ingresosFirebase").value="";
});
// añadimos los valores a frirebase de formulario de ingreso
document.getElementById("form2").addEventListener("submit", (e)=>{

    e.preventDefault();
    var egresos={
        egresos: document.getElementById("egresosFirebase").value
    };  
    firebase.database().ref("PresupuestoAPP/Egresos").set(egresos);
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
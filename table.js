$('#example').DataTable( {
    dom: 'Brtip',
    language: {
        url: 'http://cdn.datatables.net/plug-ins/2.0.0/i18n/pt-BR.json',
        searchBuilder: {
            title: "",
            add: 'Filtrar',
            data: "Coluna"
        }
    },
    // searchBuilder: {
    //     preDefined: {
    //         criteria: [
    //             {
    //                 condition: '=',
    //                 data: 'Name',
    //                 value: ['']
    //             },
    //             {
    //                 condition: '=',
    //                 data: 'Position',
    //                 value: ['']
    //             }
    //             ,
    //             {
    //                 condition: '=',
    //                 data: 'Office',
    //                 value: ['']
    //             }
    //         ],
    //         logic: 'AND'
    //     },
    // },    
    responsive: true,
    // buttons: [
    //     'searchBuilder'
    // ],
} );







// $( document ).ready(function() {
//     let minDate, maxDate;
    

//     DataTable.ext.search.push(function (settings, data, dataIndex) {
//         let min = minDate.val();
//         let max = maxDate.val();
//         let date = new Date(data[4]);
    
//         if (
//             (min === null && max === null) ||
//             (min === null && date <= max) ||
//             (min <= date && max === null) ||
//             (min <= date && date <= max)
//         ) {
//             return true;
//         }
//         return false;
//     });


//     // Create date inputs
//     minDate = new DateTime('#min', {
//         format: 'MM/DD/YYYY'
//     });
//     maxDate = new DateTime('#max', {
//         format: 'MMMM Do YYYY'
//     });
    
//     // DataTables initialisation
//     let table = new DataTable('#example');
    
//     // Refilter the table
//     document.querySelectorAll('#name,#min, #max').forEach((el) => {
//         el.addEventListener('change', () => table.draw());
//     });


// });


$( document ).ready(function() {
    listaPosicoes()
    
    let minDate, maxDate;
    

    DataTable.ext.search.push(function (settings, data, dataIndex) {
        let min = minDate.val();
        let max = maxDate.val();
        let date = new Date(data[4]);
    
        // Novo código para filtrar pelo nome
        let inputName = $('#name').val().toLowerCase(); // Substitua '#nameInput' pelo ID real do seu campo de entrada
        let name = data[0].toLowerCase();
    
        // Condições de filtro para data
        let isDateInRange = 
            (min === null && max === null) ||
            (min === null && date <= max) ||
            (min <= date && max === null) ||
            (min <= date && date <= max);
    
        // Condição de filtro para o nome
        let isNameMatch = name.startsWith(inputName);
    
        return isDateInRange && isNameMatch;
    });

    // Create date inputs
    minDate = new DateTime('#min', {
        format: 'dd/MM/YYYY'
    });
    maxDate = new DateTime('#max', {
        format: 'MMMM Do YYYY'
    });
    
    // DataTables initialisation
    let table = new DataTable('#example');
    
    // Refilter the table
    document.querySelectorAll('#name,#min, #max').forEach((el) => {
        el.addEventListener('input', () => table.draw());
    });


});





function listaPosicoes(){
    var table = $('#example').DataTable(); // Substitua pelo ID do seu DataTable

    // Extrai valores distintos da coluna (ajuste o índice da coluna conforme necessário)
    var uniqueValues = [];
    table.column(1).data().each(function(value, index) {
        if (uniqueValues.indexOf(value) === -1) {
            uniqueValues.push(value);
        }
    });
    console.log(uniqueValues)
    // Preenche o dropdown
    uniqueValues.forEach(function(value) {
        $('#columnFilter').append($('<li><a class="dropdown-item" href="#"><input class="form-check-input" type="checkbox" value="'+value+'" id="flexCheckDefault" style="margin-right:10px;">'+value+'</a></li>'));
    });

    // Evento para filtrar o DataTable
    $('#columnFilter').on('change', 'input[type="checkbox"]', function() {
        var selectedValues = [];
        $('#columnFilter input:checked').each(function() {
            selectedValues.push(this.value);
        });

        table.column(1).search(selectedValues.join('|'), true, false).draw();
    });
};


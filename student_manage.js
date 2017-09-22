 $(document).ready(function() {
        if (localStorage.length === 1) {
            return;
        }
        else {
            jQuery.ajax({
                "type":"GET",
                "url":"data.json",
                "success":function(data){
                    localStorage.setItem("session", JSON.stringify(data));
                }
            })
        }
    });



    //Create Table
    function createTable(idx) {
        var data = JSON.parse(localStorage.getItem('session'));
        console.log(data);
        console.log(data[0]["address"]["communication"]);
        var html = "<table id='table' class = 'table table-bordered table-hover'>";
        html += '<thead><tr><th>Firstname</th><th>Lastname</th><th>Email</th><th>Location</th><th>Phone</th><th>Current_class</th><th>More Option</th></tr></thead>';
        for (var num in data.slice(0, idx)) {
            html += '<tr class =row' + num + ' id=locate' + num + '>';
            html += '<td contenteditable="false">' + data[num].firstname + '</td>';
            html += '<td contenteditable="false">' + data[num].lastname + '</td>';
            html += '<td contenteditable="false">' + data[num].email + '</td>';
            html += '<td contenteditable="false">' + data[num].location + '</td>';
            html += '<td contenteditable="false">' + data[num].phone + '</td>';
            html += '<td contenteditable="false">' + data[num].current_class + '</td>';


            html += '<td id=manipu' + num + '><a href="#" id=view_' + num + ' onclick="viewWho(' + num + ')">More_details</a> ' +
                '<a href="#" id=edit_' + num + ' onclick="editWho(' + num + ')">Edit</a> ' +
                '<a href="#" id=del_' + num + ' onclick="delWho(' + num + ')">Delete</a></td>';
            html += '</tr>';

            //append another row
            html += '<tr class =row' + num +   ' style="display: none">';
            html += '<td class = "sec">Commutation Address: ' + data[num].address["communication"] + '</td>';
            html += '<td class = "sec">Permutation Address: ' + data[num].address["permutation"] + '</td>';
            html += '<td class = "sec">English Marks: '+ data[num].marks["english"] + '</td>';
            html += '<td class = "sec"> Science Marks: ' + data[num].marks["science"] + '</td>';
            html += '<td class = "sec">Computers Marks: ' + data[num].marks["computers"] + '</td>';
            html += '<td class = "sec">Hardware Marks: ' + data[num].marks["hardware"]+'</td>';
            html += '</tr>';


        }
        html += "</table>";
        jQuery('#result').html(
            html);
    }
    //Select Page
    $( "select" )
        .change(function() {
            var str = "";
            $( "select option:selected" ).each(function() {
                str += $( this ).text();
                createTable(str);

            });
            //$( "div" ).text( str );
        })
        .trigger( "change" );

    //Save In LocalStorage
    function saveData(data) {
        var a;
        a=JSON.parse(localStorage.getItem("session"));
        a.push(data);

        localStorage.setItem("session", JSON.stringify(a));
    }

    //Drag and drop for location
    function allowDrop(ev) {
        ev.preventDefault();
    }

    var elem = $('.img');
    for(var i=0; i<elem.length;i++){
        elem[i].addEventListener('dragstart',function(event){
            event.dataTransfer.setData('id',this.getAttribute('id'))
        });
    }

    function drop(ev) {
        ev.preventDefault();
        var img_id = ev.dataTransfer.getData("id");
        var caption = document.getElementById(img_id.replace("img","tst"));
        ev.target.value += $(caption).text()+' ';
        console.log($('input').val());
    }

    //Submit form to create new row
    $("#Upload").on("click", function() {
        var table_len = $("#table > tbody > tr").length / 2;
        $('<tr class=row'+table_len +' id=locate'+table_len +' >' +
            '<td contenteditable="false">'+$('input').eq(0).val()+'</td>' +
            '<td contenteditable="false">'+$('input').eq(1).val()+'</td>' +
            '<td contenteditable="false">'+$('input').eq(2).val()+'</td>' +
            '<td contenteditable="false">'+$('input').eq(3).val()+'</td>' +
            '<td contenteditable="false">'+$('input').eq(4).val()+'</td>' +
            '<td contenteditable="false">'+$('input').eq(5).val()+'</td>' +

            //'<td contenteditable="false">'+$('input').eq(6).val()+'</td>' +
            //'<td contenteditable="false">'+$('input').eq(7).val()+'</td>' +
            '<td id=manipu' + table_len + '><a href="#" id=view_'+table_len +' onclick="viewWho(' + table_len + ')">View_Detail</a> ' +
            '<a href="#" id=edit_'+table_len +' onclick="editWho(' + table_len + ')">Edit</a> ' +
            '<a href="#" id=del_0'+table_len +' onclick="delWho(' + table_len + ')">Delete</a></td></tr>' +
            '<tr class=row'+table_len +' style="display: none">' +
            '<td contenteditable="false" class = "sec">'+' PermAdd: ' +$('input').eq(7).val()+'</td>' +
            '<td contenteditable="false" class = "sec">'+' CommAdd: ' +$('input').eq(8).val()+'</td>' +
            '<td contenteditable="false" class = "sec">'+' EMarks: ' +$('input').eq(8).val()+'</td>' +
            '<td contenteditable="false" class = "sec">'+' SMarks: ' +$('input').eq(9).val()+'</td>' +
            '<td contenteditable="false" class = "sec">'+' CMarks: ' +$('input').eq(10).val()+'</td>' +
            '<td contenteditable="false" class = "sec">'+' HMarks:' +$('input').eq(11).val()+'</td>'
        ).insertBefore('#locate0');
        //Save in localStorage
        var userInfo = {};
        userInfo["firstname"] = $('input').eq(0).val();
        userInfo["lastname"] = $('input').eq(1).val();
        userInfo["email"] = $('input').eq(2).val();
        userInfo["location"] = $('input').eq(3).val();
        userInfo["phone"] = $('input').eq(4).val();
        userInfo["current_class"] = $('input').eq(5).val();
        userInfo["address"] = {
            "communication" : $('input').eq(6).val(),
            "permanent" : $('input').eq(7).val()
        }
        userInfo["marks"] = {
            "english" : $('input').eq(8).val(),
            "science" : $('input').eq(9).val(),
            "computers" : $('input').eq(10).val(),
            "hardware" : $('input').eq(11).val()
        }
        saveData(userInfo);

    });

    //View details function
    function viewWho(id) {
        var t = $(".row"+id+":eq(1)");
        t.toggle();

    }



    //Edit function
    function editWho(id) {
        var data = JSON.parse(localStorage.getItem('session'));
        var tempRow = $('.row' + id).children().siblings();
        var thisRow = tempRow.not(document.getElementById('manipu' + id));
        var editOn = $('#edit_' + id).hasClass("editMode");

        if (editOn == false) {
            $(thisRow).attr('contenteditable', 'true');
            $(thisRow).css('background-color', '#ffc9c9');
            $('#edit_' + id).removeClass("fa-pencil-square-o");
            $('#edit_' + id).addClass("fa-floppy-o editMode");

        }
        else if (editOn == true) {
            $(thisRow).attr('contenteditable', 'false');
            $(thisRow).css('background-color', 'transparent');
            $('#edit_' + id).removeClass("fa-floppy-o editMode");
            $('#edit_' + id).addClass("fa-pencil-square-o");
            var phrases = [];
            thisRow.each(function() {
                var current = $(this);
                if(current.children().length>0) {
                    return true;
                }

                phrases.push($(this).text());

            })
            console.log(phrases);
            var temp = data[id];
            temp.firstname = phrases[0];
            temp.lastname = phrases[1];
            temp.email = phrases[2];
            temp.location = phrases[3];
            temp.phone = phrases[4];
            temp.current_class = phrases[5];
            temp.marks.computers = phrases[6];
            temp.marks.english = phrases[7];
            temp.marks.hardware = phrases[8];
            temp.marks.science = phrases[9];
            data[id]=temp;
            localStorage.setItem('session', JSON.stringify(data));

        }


    }
    //Remove function
    function delWho(id) {
        var aRow = $('.row' + id).children().siblings();
        aRow.hide();
        var data1 = JSON.parse(localStorage.getItem('session'));
        data1.splice(id, 1);
        createTable($( "select option:selected" ).text());
        localStorage.setItem("session", JSON.stringify(data1));

    }

    //Filter function
    $('#searchInput').keyup(function()
    {
        var filter = $(this).val().toUpperCase();
        var tr = $("#table > tbody > tr[id*='locate']");
        //var td = $("#table > tbody > tr[id*='locate'] > td").not(document.getElementsByClassName('sec'));

        for (i = 0; i < tr.length; i++) {
            var scope1 = tr.eq(i).find('td').eq(0);
            var scope2 = tr.eq(i).find('td').eq(1);
            var scope3 = tr.eq(i).find('td').eq(2);
            var scope4 = tr.eq(i).find('td').eq(3);
            var scope5 = tr.eq(i).find('td').eq(4);


            if (scope1 || scope2 || scope3 || scope4 || scope5) {
                if (scope1.text().toUpperCase().indexOf(filter) > -1 || scope2.text().toUpperCase().indexOf(filter) > -1 ||
                    scope3.text().toUpperCase().indexOf(filter) > -1 || scope4.text().toUpperCase().indexOf(filter) > -1 ||
                    scope5.text().toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }

        }

    })


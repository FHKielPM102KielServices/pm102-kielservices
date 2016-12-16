$(document).ready(

    function () {
        //review grid
        $("#adminContactGrid").jqGrid({
            url: '/adminDashboard/getContacts',
            mtype: "GET",
            datatype: "json",
            // we set the changes to be made at client side using predefined word clientArray
            editurl: '/adminDashboard/editContact',
            page: 1,
            colModel: [
                {
                    label: 'Email', name: 'EMAIL', width: 75,
                    editable: false, editrules: { required: true }
                },
                {
                    label: 'Name', name: 'NAME', width: 140,
                    editable: true // must set editable to true if you want to make the field editable
                },
                {
                    label: 'Message', name: 'MESSAGE', width: 80,
                    editable: false
                }
            ],
            sortname: 'ID',
            sortorder: 'asc',
            viewrecords: true,
            width: 780,
            height: 400,
            rowNum: 10,
            pager: "#jqGridPager2"
        });

        $('#adminContactGrid').navGrid('#adminContactGridPager',
            // the buttons to appear on the toolbar of the grid
            { edit: false, add: false, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "The Edit Dialog",
                recreateForm: true,
                checkOnUpdate: true,
                checkOnSubmit: true,
                closeAfterEdit: true,
                editurl: function (data) {
                    alert("edit");
                },
                errorTextFormat: function (data) {
                    return 'Error: ' + data.responseText
                }
            },
            // options for the Add Dialog
            {
                closeAfterAdd: true,
                recreateForm: true,
                errorTextFormat: function (data) {
                    return 'Error: ' + data.responseText
                }
            },
            // options for the Delete Dailog
            {
                errorTextFormat: function (data) {
                    return 'Error: ' + data.responseText
                }
            });
    }
);


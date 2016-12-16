$(document).ready(

    function () {
        //review grid
        $("#reviewGrid").jqGrid({
            url: '/userDashboard/getReviews',
            mtype: "GET",
            datatype: "json",
            // we set the changes to be made at client side using predefined word clientArray
            editurl: '/userDashboard/editReview',
            page: 1,
            colModel: [
                {
                    label: 'Id', name: 'id', width: 75, key: true,
                    editable: false, editrules: { required: true }
                },
                {
                    label: 'Place Name', name: 'name', width: 75,
                    editable: false, editrules: { required: true }
                },
                {
                    label: 'Address', name: 'address', width: 140,
                    editable: false // must set editable to true if you want to make the field editable
                },
                {
                    label: 'Description', name: 'description', width: 140,
                    editable: true // must set editable to true if you want to make the field editable
                },
                {
                    label: 'Review Date', name: 'viewdate', width: 80,
                    editable: false
                }
            ],
            sortname: 'OrderID',
            sortorder: 'asc',
            viewrecords: true,
            width: 780,
            height: 400,
            rowNum: 10,
            pager: "#reviewGridPager"
        });

        $('#reviewGrid').navGrid('#reviewGridPager',
            // the buttons to appear on the toolbar of the grid
            { edit: true, add: false, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
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
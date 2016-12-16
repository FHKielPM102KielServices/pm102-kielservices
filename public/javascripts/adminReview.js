$(document).ready(

    function () {
        //review grid
        $("#adminReviewGrid").jqGrid({
            url: '/adminDashboard/getReviews',
            mtype: "GET",
            datatype: "json",
            // we set the changes to be made at client side using predefined word clientArray
            editurl: '/adminDashboard/editReview',
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
                    editable: true // must set editable to true if you want to make the field editable
                },
                {
                    label: 'Description', name: 'description', width: 140,
                    editable: true // must set editable to true if you want to make the field editable
                },
                {
                    label: 'Review Date', name: 'viewdate', width: 80,
                    editable: false
                }, 
                {
                    label: 'Status', name: 'confirm', width: 140,
                    editable: false
                }
            ],
            sortname: 'OrderID',
            sortorder: 'asc',
            viewrecords: true,
            width: 780,
            height: 400,
            rowNum: 10,
            pager: "#adminReviewGridPager"
        });

        $('#adminReviewGrid').navGrid('#adminReviewGridPager',
            // the buttons to appear on the toolbar of the grid
            { edit: false, add: false, del: true, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Delete Dailog
            {
                errorTextFormat: function (data) {
                    return 'Error: ' + data.responseText
                }
            })
            .navButtonAdd("#adminReviewGridPager", {
                caption: "",
                buttonicon: "ui-icon-check",
                onClickButton: function () {
                    var selectedId = $('#adminReviewGrid').jqGrid('getGridParam', 'selrow');
                    $.post(
                        "/adminDashboard/confirmReview",
                        { id: selectedId },
                        function (data) {
                            if (data === 'success') {
                                $('#adminReviewGrid').trigger('reloadGrid');
                                $("#successAlert").show();
                            }
                            else
                                $("#failureAlert").show();
                        });
                },
                position: "last",
                title: "confirm",
                cursor: "pointer"
            })
            .navButtonAdd("#adminReviewGridPager", {
                buttonicon: "ui-icon-closethick",
                onClickButton: function () {
                    var selectedId = $('#adminReviewGrid').jqGrid('getGridParam', 'selrow');
                    $.post(
                        "/adminDashboard/rejectReview",
                        { id: selectedId },
                        function (data) {
                            if (data === 'success') {
                                $('#adminReviewGrid').trigger('reloadGrid');
                                $("#successAlert").show();
                            }
                            else
                                $("#failureAlert").show();
                        });
                },
                position: "last",
                title: "Reject",
                cursor: "pointer"
            })
            ;
    }
);
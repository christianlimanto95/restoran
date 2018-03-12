$(function() {
    get_all_bahan();
});

function get_all_bahan() {
    ajaxCall(get_all_bahan_url, null, function(json) {
        var result = jQuery.parseJSON(json);
        var data = result.data;
        var iLength = data.length;
        var element = "";
        for (var i = 0; i < iLength; i++) {
            element += "<tr>";
            element += "<td>" + data[i].bahan_id + "</td>";
            element += "<td>" + data[i].bahan_nama + "</td>";
            element += "<td>" + data[i].bahan_stok + " " + data[i].bahan_satuan + "</td>";
            element += "<td><div class='button btn-tambah'>TAMBAH</div><div class='button btn-kurang'>KURANG</div><div class='button btn-hapus'>HAPUS</div></td>";
            element += "</tr>";
        }
        $(".table-list-stok tbody").append(element);
    });
}
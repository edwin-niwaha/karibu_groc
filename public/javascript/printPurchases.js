function PrintTable() {
    var divToPrint=document.getElementById("myTable");
    // newWin= window.open("");
    newWin= window.open('', '', 'height=300,width=600');
    // newWin.document.write(divToPrint.outerHTML);
    newWin.document.write('<html><head><title>Purchases Report</title>');
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
}

function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('myTable');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
      XLSX.writeFile(wb, fn || ('Purchases Report.' + (type || 'xlsx')));
 }

 function searchFunc() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }